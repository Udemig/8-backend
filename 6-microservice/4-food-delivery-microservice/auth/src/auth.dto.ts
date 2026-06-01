import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Password regex
const passwordRegex = /^(?=.*[A-ZÇĞİÖŞÜ])(?=.*[a-zçğıöşü])(?=.*\d)(?=.*[^A-Za-zÇĞİÖŞÜçğıöşü0-9]).+$/;

// Zod schema
export const registerSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .regex(passwordRegex, "Şifreniz yeterince güçlü değil"),
  firstName: z.string().min(2, "Ad en az 2 karakter olmalıdır"),
  lastName: z.string().min(2, "Soyad en az 2 karakter olmalıdır"),
  phone: z.string().min(1, "Telefon numarası zorunludur"),
  role: z.enum(["customer", "restaurant_owner", "courier", "admin"]),
});

export const loginSchema = z.object({
  email: z.email("Geçerli bir email adresi giriniz"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

// Şemalar üzerinden tip oluşturabiliyoruz
export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

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
