import mongoose from "mongoose";
import { cache } from "react";

// env'deki veritabanı url'i
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";

// mevcut bağlantıyı tutucağımız nesne
const cached: { connection?: typeof mongoose; promise?: Promise<typeof mongoose> } = {};

// veritabanına bağlanıcak ve bağlantıyı cache'e atıcak
// fonksiyon tekrar çağrıldığında zaten cache'de bir bağlantı varsa yeni bir bağlantı oluşturmak yerine cache'deki bağlantıyı kullanıcak
async function connectMongo() {
  // eğer mevcut bir bağlantı varsa
  if (cached.connection) {
    // mevcut vt bağlantısını döndür ve yeni bağlantı kurma
    return cached.connection;
  }

  // henüz bir bağlantı kurulmamışsa:
  if (!cached.promise) {
    // yeni bir vt bağlantısı oluştur
    // bufferCommands:false -> vt bağlanamdan önce yapılan sorguların direkt hata vermesini sağlar
    cached.promise = mongoose.connect(MONGO_URI, { bufferCommands: false });
  }

  // mevcut bağlantı promise'ini kullanarak vt'na bağlan
  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = undefined;
    throw error;
  }

  // mevcut bağlantıyı return et
  return cached.connection;
}

export default connectMongo;
