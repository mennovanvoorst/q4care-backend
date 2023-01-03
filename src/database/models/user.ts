/* eslint-disable no-bitwise */
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
  BelongsToMany,
  Scopes,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import { USER_ROLES } from "@constants";
import Class from "./class";
import LoginToken from "./loginToken";
import Skill from "./skill";
import UserSkill from "./userSkill";

export enum UserFlags {
  NONE = 0,
  ADMINISTRATOR = 1,
  TEACHER = 2,
}

@Scopes({
  profile: {
    attributes: ["id", "firstName", "lastName", "email", "flags"],
  },

  withSkills: {
    include: [
      {
        model: () => Skill,
        as: "skills",
        attributes: ["id", "name"],
        through: { attributes: [] },
        required: false,
      },
    ],
  },

  withClass: {
    include: [
      {
        model: () => Class,
        as: "class",
        attributes: ["id", "name"],
        required: false,
      },
    ],
  },
})
@Table({
  underscored: true,
  tableName: "users",
  modelName: "User",
})
class User extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column({ type: DataType.TEXT, allowNull: true })
  firstName: string | null;

  @Column({ type: DataType.TEXT, allowNull: true })
  lastName: string | null;

  @Column({ type: DataType.TEXT, unique: true })
  email: string;

  @Column({ type: DataType.NUMBER })
  flags: number;

  @HasMany(() => LoginToken)
  loginTokens: LoginToken[];

  @ForeignKey(() => Class)
  @Column(DataType.TEXT)
  classId: string;

  @BelongsTo(() => Class)
  class: Class[];

  @BelongsToMany(() => Skill, () => UserSkill)
  skills: Skill[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: User) {
    instance.id = generateId();
  }

  async setAccess() {
    try {
      let userFlags = this.getDataValue("flags");
      const userHasAlreadyAccess = !!(userFlags & USER_ROLES.paid);

      if (!userHasAlreadyAccess) {
        userFlags += USER_ROLES.paid;
        await this.update({ flags: userFlags });
      }

      return true;
    } catch (e) {
      return false;
    }
  }

  async removeAccess() {
    try {
      let userFlags = this.getDataValue("flags");
      const userHasAlreadyAccess = userFlags & USER_ROLES.paid;

      if (userHasAlreadyAccess) {
        userFlags -= USER_ROLES.paid;
        await this.update({ flags: userFlags });
      }

      return true;
    } catch (e) {
      return false;
    }
  }
}

export default User;
