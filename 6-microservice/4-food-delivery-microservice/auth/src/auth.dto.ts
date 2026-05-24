import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod schema
export const registerSchema = z.object({
  name: z.string().min(3),
  age: z.coerce.number().int().positive(),
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
