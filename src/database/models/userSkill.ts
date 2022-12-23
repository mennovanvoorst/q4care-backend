/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import {
  Table,
  Model,
  Column,
  ForeignKey,
  DataType,
  CreatedAt,
  UpdatedAt,
  Scopes,
  BelongsTo,
} from "sequelize-typescript";
import Skill from "./skill";
import User from "./user";

@Scopes({
  default: {
    attributes: ["skill.id", "skill.name", "achievementDate"],
    raw: true,
    include: [
      {
        model: () => Skill,
        as: "skill",
        attributes: [],
        required: true,
      },
    ],
  },
})
@Table({
  underscored: true,
  tableName: "user_skills",
  modelName: "UserSkill",
})
class UserSkill extends Model {
  @ForeignKey(() => User)
  @Column(DataType.TEXT)
  userId: string;

  @ForeignKey(() => Skill)
  @Column(DataType.TEXT)
  skillId: string;

  @BelongsTo(() => Skill)
  skill: Skill;

  @Column({ type: DataType.DATE, allowNull: false })
  achievementDate: Date;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;
}

export default UserSkill;
