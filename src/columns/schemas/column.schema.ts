import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

/**
 * Column Document:
- _id: unique identifier
- title: string
- boardId: reference to Board ID
- order: number
- isArchived: boolean
- cards: array of Card IDs
 */
export type ColumnDocument = HydratedDocument<Column>
@Schema()
export class Column {
  @Prop()
  title: string

  @Prop()
  boardId: string

  @Prop()
  order: number

  @Prop()
  isArchived: boolean

  @Prop()
  cards: string[]
}

export const ColumnSchema = SchemaFactory.createForClass(Column)
