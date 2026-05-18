const { CartModel, OrderModel } = require("../models");
const { v4: uuidv4 } = require("uuid");
const { APIError, BadRequestError } = require("../../utils/app-errors");
const Cart = require("../models/Cart");

class ShoppingRepository {
  async Orders(customerId) {
    try {
      const orders = await OrderModel.find({ customerId });
      return orders;
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Orders");
    }
  }

  async CreateNewOrder(customerId, txnId) {
    //check transaction for payment Status

    try {
      const cart = await CartModel.findOne({ customerId });

      if (cart) {
        let amount = 0;

        let cartItems = cart.items;

        if (cartItems.length > 0) {
          //process Order
          cartItems.map((item) => {
            amount += parseInt(item.product.price) * parseInt(item.unit);
          });

          const orderId = uuidv4();

          const order = new OrderModel({
            orderId,
            customerId,
            amount,
            txnId,
            status: "received",
            items: cartItems,
          });

          cart.items = [];

          const orderResult = await order.save();

          await cart.save();

          return orderResult;
        }
      }

      return {};
    } catch (err) {
      throw APIError("API Error", STATUS_CODES.INTERNAL_ERROR, "Unable to Find Category");
    }
  }

  async GetCart(customerId) {
    try {
      const cart = await CartModel.findOne({ customerId });
      return cart;
    } catch (error) {
      throw new APIError("API Error", 500, "Cart bulunamadı");
    }
  }

  async UpdateCart(customerId, product, qty, isRemove) {
    console.log("UPDATE CART ÇALIŞTI");

    try {
      const cart = await CartModel.findOne({ customerId });

      console.log("UPDATE CART 1");

      // Kullanıcının sepeti varsa:
      if (cart) {
        let cartItems = cart.items;
        let isExist = false;

        console.log("UPDATE CART 2");

        if (cartItems.length > 0) {
          cartItems = cartItems
            .map((item) => {
              if (item._id.toString() === product._id.toString()) {
                console.log("UPDATE CART 3");

                if (isRemove) {
                  // isRemove true ise: ürünü sil
                  return null;
                } else {
                  // isRemove false ise: ürünü güncelle
                  isExist = true;
                  return { ...item, unit: qty };
                }
              }
            })
            .filter(Boolean);

          console.log("UPDATE CART 4");

          // eğer ürün sepette yoksa ve silme işlemi yapılmayacaksa: sepete ekle
          if (!isExist && !isRemove) {
            cartItems.push({ ...product, unit: qty });
          }

          console.log("UPDATE CART 5");

          // veritabanına güncellemyi kaydet
          cart.items = cartItems;
          return await cart.save();
        }
      } else {
        // kullanıcının sepeti yoksa: sepet oluştur
        return await CartModel.create({
          customerId,
          items: [{ ...product, unit: qty }],
        });
      }
    } catch (err) {
      console.log("HATA BURDA OLDU - 1", err);
      throw new APIError("API Error", 500, "İşlem başarısız");
    }
  }
}

module.exports = ShoppingRepository;
