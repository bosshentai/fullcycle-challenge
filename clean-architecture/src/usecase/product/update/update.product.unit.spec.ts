import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const product = ProductFactory.create("a", "Product 1", 100);

const input = {
  id: product.id,
  name: "Product 1 Updated",
  price: 200,
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    update: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);
    expect(output).toEqual(input);
  });

  it("should throw an error when product not found", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);
    productRepository.find = jest.fn().mockReturnValue(Promise.resolve(null));
    expect(async () => {
      await productUpdateUseCase.execute(input);
    }).rejects.toThrow("Product not found");
  });
});
