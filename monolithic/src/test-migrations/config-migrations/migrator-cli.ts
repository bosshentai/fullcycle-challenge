import { join } from "path";
import { migrator } from "./migrator";
import { Sequelize } from "sequelize-typescript";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: join(__dirname, "../../../database.sqlite"),
  logging: false,
});

migrator(sequelize).runAsCLI();
