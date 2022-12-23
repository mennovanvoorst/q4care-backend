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
  BelongsToMany,
  Scopes,
  AfterDestroy,
} from "sequelize-typescript";
import User from "./user";
import UserSkill from "./userSkill";

@Scopes({
  default: {
    attributes: ["id", "name"],
  },
})
@Table({
  underscored: true,
  tableName: "skills",
  modelName: "Skill",
})
class Skill extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column(DataType.TEXT)
  name: string;

  @BelongsToMany(() => User, () => UserSkill)
  users: User[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: Skill) {
    instance.id = generateId();
  }

  @AfterDestroy
  static async removeSkillsFromUsers(instance: Skill) {
    await instance.$remove("users", instance.users);
  }
}

export default Skill;
