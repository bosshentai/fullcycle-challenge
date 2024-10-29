import { Sequelize } from "sequelize-typescript";
import { TransactionModel } from "./transaction.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Transaction from "../domain/transaction";
import TransactionRepository from "./transaction.repository";

describe("TransactionRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([TransactionModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a transaction", async () => {
    const transaction = new Transaction({
      id: new Id("1"),
      orderId: "1",
      amount: 100,
    });

    transaction.approve();

    const repository = new TransactionRepository();
    const result = await repository.save(transaction);

    expect(result.id.id).toBe(transaction.id.id);
    expect(result.status).toBe("approved");
    expect(result.amount).toBe(transaction.amount);
    expect(result.orderId).toBe(transaction.orderId);
  });
});