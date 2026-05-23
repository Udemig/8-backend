const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const amqplib = require("amqplib");
const { APP_SECRET, RABBITMQ_URI, EXCHANGE_NAME, QUEUE_NAME } = require("../config");

//Utility functions
module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt();
};

module.exports.GeneratePassword = async (password, salt) => {
  return await bcrypt.hash(password, salt);
};

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return (await this.GeneratePassword(enteredPassword, salt)) === savedPassword;
};

module.exports.GenerateSignature = async (payload) => {
  try {
    return await jwt.sign(payload, APP_SECRET, { expiresIn: "30d" });
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports.ValidateSignature = async (req) => {
  try {
    const signature = req.get("Authorization");
    console.log(signature);
    const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET);
    req.user = payload;
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports.FormateData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};

//! RabbitMQ
// Diğer servislere rabbitmq ile mesaj gönderen fonksiyonlar

//! Kanal Oluştur
module.exports.CreateChannel = async () => {
  try {
    // rabbitmq sunucuna bağlan
    const connection = await amqplib.connect(RABBITMQ_URI);

    // kanal oluştur
    const channel = await connection.createChannel();

    // exchange oluştur
    // exchange: kanala gelen emesajlı alıp kuyrupa yönlendiren eleman
    await channel.assertExchange(EXCHANGE_NAME, "direct", false);

    // kanalı return et
    return channel;
  } catch (error) {
    throw error;
  }
};

//! Mesaj Yayınla
module.exports.PublishMessage = async (channel, routingKey, message) => {
  try {
    await channel.publish(EXCHANGE_NAME, routingKey, Buffer.from(JSON.stringify(message)));

    console.log("🚨 Mesaj kanala gönderildi");
  } catch (error) {
    throw error;
  }
};

//! Mesaj Kuyruğuna Abone OL
module.exports.SubscribeQueue = async (channel, routingKey, service) => {
  try {
    // yeni bir kuyruk oluştur
    const appQueue = await channel.assertQueue(QUEUE_NAME);

    // kuyruğu kanala bağla
    channel.bindQueue(appQueue.queue, EXCHANGE_NAME, routingKey);

    // aynı anda sadece 1 mesajı işle (race condition)
    await channel.prefetch(1);

    // kuyruktaki mesajlara abone ol
    channel.consume(appQueue.queue, async (data) => {
      if (!data) return;

      try {
        console.log("🚨 Kuyruktan mesaj alındı");
        console.log(data.content.toString());
        await service.SubscribeEvents(JSON.parse(data.content.toString()));
        // kuyruktan mesajı aldığımı söyleriz | mesaj silinir
        channel.ack(data);
      } catch (error) {
        // tekrar denemeye sokmadan kuyruktan düşür
        channel.nack(data, false, false);
      }
    });
  } catch (error) {
    throw error;
  }
};
