import { z } from "zod";

/*
 * Ortam Değişkenlerini Doğrula
 * Bu sayede env değişkenleri doğru typescript tiplerine sahip olucak
 * Eksik / yanlış bir key olduğunda uyugluma hiç ayağa kalkmayı denemeden kapanıcak
 * Fail-Fast
 */

const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  MONGODB_URI: z.string().min(1, "MONGODB_URI gerekli"),
  JWT_SECRET: z.string().min(16, "JWT_SECRET en az 16 karakter olmalı"),
  RABBITMQ_URI: z.string().min(1, "RABBITMQ_URI gerekli"),
  RATE_LIMIT_WINDOW: z.coerce.number().int().positive(),
  RATE_LIMIT_MAX_REQ: z.coerce.number().int().positive(),
});

export type Env = z.infer<typeof envSchema>;

// todo: env'lerin şema üzeirnden kontrolünü yapıp eksik varsa console'a yazan fonksiyon yaz 