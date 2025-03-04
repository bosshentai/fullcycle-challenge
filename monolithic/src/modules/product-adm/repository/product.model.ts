import { Column, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table({
  modelName: "product-adm-table",
  tableName: "products",
  timestamps: false,
})
export default class ProductAdmModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string;
  @Column({ allowNull: false })
  name: string;
  @Column({ allowNull: false })
  description: string;
  @Column({ allowNull: false })
  purchasePrice: number;

  @Column({ allowNull: false })
  salesPrice: number;
  @Column({ allowNull: false })
  stock: number;
  @Column({ allowNull: true })
  createdAt: Date;
  @Column({ allowNull: true })
  updatedAt: Date;
}
