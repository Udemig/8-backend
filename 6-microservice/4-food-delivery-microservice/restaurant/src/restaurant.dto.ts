import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod schema
export const createRestaurantSchema = z.object({
  name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
  description: z.string().min(10, "açıklama en az 10 karakter olmalıdır"),
  address: z.string().min(10, "Adres en az 2 karakter olmalıdır"),
  phone: z.string().min(1, "Telefon numarası zorunludur"),
  email: z.email("Geçerli bir email adresi giriniz"),
  categories: z.array(z.string()).min(1, "En az 1 kategori seçiniz"),
  deliveryTime: z.coerce
    .number()
    .min(10, "Teslimat süresi en az 10 dakika olmalıdır")
    .max(120, "Teslimat süresi en fazla 120 dakika olabilir"),
  minOrderPrice: z.coerce.number().min(0, "Min. sipariş ücreti 0'dan küçük olamaz"),
  deliveryFee: z.coerce.number().min(0, "Teslimat ücreti 0'dan küçük olamaz"),
  isOpen: z.boolean().default(true),
});

// query params schema
export const queryParamsSchema = z.object({
  page: z.coerce.number().int().positive("Sayfa numarası 1'den büyük olmalıdır").default(1),
  limit: z.coerce.number().int().min(1, "Limit 1'den küçük olmaz").max(100, "Limit 100'den büyük olmaz").default(10),
  categories: z.coerce.string().optional(),
  name: z.coerce.string().optional(),
  deliveryTime: z.coerce
    .number()
    .min(15, "Teslimat süresi en az 15 dakika olmalıdır")
    .max(120, "Teslimat süresi en fazla 120 dakika olmalıdır")
    .optional(),
  minOrderPrice: z.coerce.number().min(0, "Min. sipariş tutarı 0'dan küçük olamaz").optional(),
});

// yeni ürün oluşturuken kullanılacak şema
export const createMenuItemSchema = z.object({
  name: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  price: z.coerce.number().min(0, "Fiyat 0'dan küçük olamaz"),
  category: z.string().min(2, "Kategori en az 2 karakter olmalıdır"),
  imageUrl: z
    .url("Geçerli bir resim URL'i giriniz")
    .default(
      "https://cdn.creativefabrica.com/2020/03/09/Simple-Fork-Plate-Icon-Restaurant-Logo-Graphics-3446203-1-1-580x348.jpg",
    ),
  ingredients: z.array(z.string()).default([]),
  allergens: z.array(z.string()).default([]),
  isVegetarian: z.boolean().default(false),
  isAvailable: z.boolean().default(true),
  preperationTime: z.coerce
    .number()
    .min(5, "Hazırlama süresi en az 5 dakika olmalıdır")
    .max(120, "Hazırlama süresi en fazla 120 dakika olmalıdır"),
});

// ürünü güncellerken kullanılacak şema
export const updateMenuItemSchema = createMenuItemSchema.partial();

// Infer Type
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>;
export type QueryParamsInput = z.infer<typeof queryParamsSchema>;
export type CreateMenuItemInput = z.infer<typeof createMenuItemSchema>;
export type UpdateMenuItemInput = z.infer<typeof updateMenuItemSchema>;

// Bir şema ve veri alıp verinin şemaya uygun olup olmadığını kontrol eden fonksiyon
export async function validateDTO<T>(schema: z.ZodSchema<T>, data: unknown) {
  try {
    return schema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(z.prettifyError(error));
    }

    throw error;
  }
}
