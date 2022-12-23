/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { generateId } from "@utils";
import {
  Table,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  BeforeCreate,
  DeletedAt,
  Scopes,
  HasMany,
} from "sequelize-typescript";
import User from "./user";

@Scopes({
  default: {
    attributes: ["id", "name"],
  },
})
@Table({
  underscored: true,
  tableName: "classes",
  modelName: "Class",
})
class Class extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column(DataType.TEXT)
  name: string;

  @HasMany(() => User)
  users: User[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: Class) {
    instance.id = generateId();
  }
}

export default Class;
