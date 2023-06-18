import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose"

// Board Document:
// - _id: unique identifier
// - name: string
// - ownerId: reference to User ID
// - columns: array of Column IDs

export type BoardDocument = Board & Document

@Schema()
export class Board {
  @Prop()
  name: string

  @Prop()
  ownerId: string

  @Prop()
  columns: string[]
}

export const BoardSchema = SchemaFactory.createForClass(Board)
