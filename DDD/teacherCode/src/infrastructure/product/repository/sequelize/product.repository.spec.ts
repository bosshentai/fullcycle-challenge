import { Sequelize } from "sequelize-typescript";

import ProductRepository from "./product.repository";
import ProductModel from "./product.model";
import Product from "../../../../domain/product/entity/product";

describe("Product repository unit test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 100,
    });
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });
    expect(productModel.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 1",
      price: 100,
    });

    product.changeName("Product 2");
    product.changePrice(200);

    await productRepository.update(product);

    const productModel2 = await ProductModel.findOne({ where: { id: "123" } });

    expect(productModel2.toJSON()).toStrictEqual({
      id: "123",
      name: "Product 2",
      price: 200,
    });
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "123" } });

    const foundProduct = await productRepository.find("123");

    expect(productModel.toJSON()).toStrictEqual({
      id: foundProduct.id,
      name: foundProduct.name,
      price: foundProduct.price,
    });
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 100);
    await productRepository.create(product);

    const product2 = new Product("456", "Product 2", 200);
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product, product2];

    expect(foundProducts).toEqual(products);
  });
});
