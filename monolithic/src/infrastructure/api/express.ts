import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import pinoHttp from "pino-http";
import { clientRoute } from "./routers/client.route";
import { productRoute } from "./routers/product.route";
import { ProductModel } from "../../modules/product-adm/repository/product.model";
import { ClientModel } from "../../modules/client-adm/repository/client.model";
import { checkoutRoute } from "./routers/checkout.route";
import { CheckoutModel } from "../../modules/checkout/repository/checkout.model";
import OrderItemModel from "../../modules/checkout/repository/order-item.model";
import OrderModel from "../../modules/checkout/repository/order.model";
import { ProductModel as StoreCatalogProductModel } from "../../modules/store-catalog/repository/product.model";

export const app: Express = express();
app.use(pinoHttp());
app.use(express.json());
app.use("/client", clientRoute);
app.use("/product", productRoute);
app.use("/checkout", checkoutRoute);

export let sequelize: Sequelize;

async function setupDb() {
  sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: true,
  });

  await sequelize.addModels([
    ClientModel,
    CheckoutModel,
    OrderItemModel,
    OrderModel,
    ProductModel,
    StoreCatalogProductModel,
  ]);
  await sequelize.sync();
}

setupDb();
