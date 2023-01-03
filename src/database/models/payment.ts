/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import {
  Table,
  Model,
  Column,
  ForeignKey,
  BelongsTo,
  DataType,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  BeforeCreate,
  Scopes,
} from "sequelize-typescript";
import { addDays, differenceInDays } from "date-fns";
import { generateId } from "@utils";
import User from "./user";
import Product from "./product";

export const PaymentStatus = {
  open: "open",
  canceled: "canceled",
  pending: "pending",
  authorized: "authorized",
  expired: "expired",
  failed: "failed",
  paid: "paid",
} as const;

@Scopes({
  default: {
    attributes: ["id", "status", "currency", "value", "paymentDate"],
  },

  withProduct: {
    include: [
      {
        model: () => Product,
        as: "product",
        attributes: ["id", "name", "description", "daysValid"],
        required: false,
      },
    ],
  },

  withUser: {
    include: [
      {
        model: () => User,
        as: "user",
        attributes: ["id", "firstName", "lastName"],
        required: false,
      },
    ],
  },
})
@Table({
  underscored: true,
  tableName: "payments",
  modelName: "Payment",
})
class Payment extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  externalId: string | null;

  @Column({ type: DataType.TEXT })
  status: typeof PaymentStatus;

  @Column({ type: DataType.TEXT })
  currency: string;

  @Column({ type: DataType.TEXT })
  value: string;

  @Column({ type: DataType.DATE })
  paymentDate: Date;

  @ForeignKey(() => Product)
  @Column(DataType.TEXT)
  productId: string;

  @BelongsTo(() => Product)
  product: Product;

  @ForeignKey(() => User)
  @Column(DataType.TEXT)
  userId: string;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: Payment) {
    instance.id = generateId();
  }

  async isValid() {
    try {
      const product = await this.$get("product");
      if (!product) return false;
      if (!product.daysValid) return true;

      const curDate = new Date();
      const expirationDate = addDays(
        new Date(this.paymentDate),
        product.daysValid
      );

      return differenceInDays(curDate, expirationDate) >= 0;
    } catch (e) {
      return false;
    }
  }
}

export default Payment;
