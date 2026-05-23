const dotEnv = require("dotenv");

// if (process.env.NODE_ENV !== "prod") {
//   const configFile = `./.env.${process.env.NODE_ENV}`;
//   dotEnv.config({ path: configFile });
// } else {
//   dotEnv.config();
// }

dotEnv.config();

console.log(process.env.NODE_ENV);

module.exports = {
  PORT: process.env.PORT,
  DB_URL: process.env.MONGODB_URI,
  APP_SECRET: process.env.APP_SECRET,
  RABBITMQ_URI: process.env.RABBITMQ_URI,
  EXCHANGE_NAME: process.env.EXCHANGE_NAME,
  QUEUE_NAME: process.env.QUEUE_NAME,
  SHOPPING_ROUTING_KEY: process.env.SHOPPING_ROUTING_KEY,
  CUSTOMER_ROUTING_KEY: process.env.CUSTOMER_ROUTING_KEY,
  PRODUCTS_ROUTING_KEY: process.env.PRODUCTS_ROUTING_KEY,
};
