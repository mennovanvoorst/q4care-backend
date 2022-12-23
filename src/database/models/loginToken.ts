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
} from "sequelize-typescript";
import jwt from "jsonwebtoken";
import config from "@config";
import { addMinutes } from "date-fns";
import User from "./user";

export interface LoginTokenJWT {
  iat: number;
  userId: string;
}

@Table({
  underscored: true,
  tableName: "login_tokens",
  modelName: "LoginToken",
})
class LoginToken extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  token: string;

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

  deserialize() {
    try {
      return jwt.verify(
        this.getDataValue("token"),
        config.secret
      ) as LoginTokenJWT;
    } catch (e) {
      return null;
    }
  }

  isValid() {
    try {
      const deserialized = this.deserialize();
      if (!deserialized) return false;

      const isSameUser = this.getDataValue("userId") === deserialized.userId;
      const isNotExpired =
        new Date() <= addMinutes(new Date(deserialized.iat * 1000), 15);

      return isSameUser && isNotExpired;
    } catch (e) {
      return false;
    }
  }
}

export default LoginToken;
