/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { generateId } from "@utils";
import { Sequelize } from "sequelize";
import {
  Table,
  Model,
  Column,
  HasMany,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BeforeCreate,
  Scopes,
} from "sequelize-typescript";
import Payment from "./payment";

@Scopes({
  default: {
    attributes: ["id", "name", "description", "currency", "value", "daysValid"],
  },
})
@Table({
  underscored: true,
  tableName: "products",
  modelName: "Product",
})
class Product extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column({ type: DataType.TEXT })
  name: string;

  @Column({ type: DataType.TEXT })
  description: string;

  @Column({ type: DataType.TEXT })
  currency: string;

  @Column({ type: DataType.TEXT })
  value: string;

  @Column({ type: DataType.NUMBER })
  daysValid: number | null;

  @HasMany(() => Payment)
  payments: Payment[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: Product) {
    instance.id = generateId();
  }
}

export default Product;
