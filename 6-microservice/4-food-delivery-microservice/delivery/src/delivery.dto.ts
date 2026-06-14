import z from "zod";

// DTO: Data Transfer Object - Veri Taşıyan Nesne
// Bu dosyada bu tarz frontend'den gelen verilerin validasyonunu yapan şemalar yer alıcak

// Zod schema
export const deliveryUpdateSchema = z.object({
  status: z.enum(["on_the_way", "delivered", "cancelled"]),
  location: z.object({ lat: z.coerce.number(), lon: z.coerce.number() }),
  notes: z.string().optional(),
});

export const courierStatusSchema = z.object({
  status: z.enum(["available", "offline"]),
});

// infer
export type DeliveryUpdateInput = z.infer<typeof deliveryUpdateSchema>;
export type CourierStatusInput = z.infer<typeof courierStatusSchema>;

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
