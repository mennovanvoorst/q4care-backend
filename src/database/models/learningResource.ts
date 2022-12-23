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
import File from "./file";

@Scopes({
  default: {
    attributes: ["id", "title", "creationDate"],
  },
  withBody: {
    attributes: ["body"],
    include: [() => File],
  },
})
@Table({
  underscored: true,
  tableName: "learning_resources",
  modelName: "LearningResource",
})
class LearningResource extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column(DataType.TEXT)
  title: string;

  @Column(DataType.TEXT)
  body: string;

  @HasMany(() => File)
  files: File[];

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: LearningResource) {
    instance.id = generateId();
  }
}

export default LearningResource;
