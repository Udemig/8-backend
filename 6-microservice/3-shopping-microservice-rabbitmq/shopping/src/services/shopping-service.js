const { ShoppingRepository } = require("../database");
const { FormateData } = require("../utils");
const { STATUS_CODES, APIError } = require("../utils/app-errors");

// All Business logic will be here
class ShoppingService {
  constructor() {
    this.repository = new ShoppingRepository();
  }

  async PlaceOrder(userInput) {
    const { _id, txnNumber } = userInput;

    // Verify the txn number with payment logs

    try {
      const orderResult = await this.repository.CreateNewOrder(_id, txnNumber);
      return FormateData(orderResult);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetOrders(customerId) {
    try {
      const orders = await this.repository.Orders(customerId);
      return FormateData(orders);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async GetCart(customerId) {
    try {
      const cart = await this.repository.GetCart(customerId);
      return FormateData(cart);
    } catch (err) {
      throw new APIError("Data Not found", STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async ManageCart(customerId, product, qty, isRemove) {
    try {
      const cart = await this.repository.UpdateCart(customerId, product, qty, isRemove);
      return FormateData(cart);
    } catch (err) {
      throw new APIError(err.message, STATUS_CODES.NOT_FOUND, err.message);
    }
  }

  async SubscribeEvents(payload) {
    const { event, data } = payload;
    const { userId, product, qty } = data;

    switch (event) {
      case "ADD_TO_CART":
        await this.ManageCart(userId, product, qty, false);
        break;
      case "REMOVE_FROM_CART":
        await this.ManageCart(userId, product, qty, true);
        break;
      default:
        break;
    }
  }
}

module.exports = ShoppingService;
