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
