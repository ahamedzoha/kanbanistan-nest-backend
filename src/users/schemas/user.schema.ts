import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"
import { Board } from "../../boards/schemas/board.schema"

export type UserDocument = HydratedDocument<User>

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  password: string

  //   @Prop({ type: Object })
  //   profile: Record<string, any>

  //   @Prop({ type: [{ type: Board }] })
  //   boards: Board[]
}

export const UserSchema = SchemaFactory.createForClass(User)
