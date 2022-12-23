/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
import { generateId } from "@utils";
import { Blob } from "buffer";
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
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import LearningResource from "./learningResource";

@Scopes({
  default: {
    attributes: ["id", "name", "contents"],
  },
})
@Table({
  underscored: true,
  tableName: "files",
  modelName: "File",
})
class File extends Model {
  @Column({ primaryKey: true, unique: true, type: DataType.TEXT })
  id: string;

  @Column(DataType.TEXT)
  name: string;

  @Column(DataType.TEXT)
  contents: string;

  @ForeignKey(() => LearningResource)
  @Column(DataType.TEXT)
  learningResourceId: string;

  @BelongsTo(() => LearningResource)
  learningResource: LearningResource;

  @CreatedAt
  creationDate: Date;

  @UpdatedAt
  updatedOn: Date;

  @DeletedAt
  deletionDate: Date;

  @BeforeCreate
  static addId(instance: File) {
    instance.id = generateId();
  }
}

export default File;
