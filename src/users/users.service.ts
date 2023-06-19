import { Injectable, NotFoundException } from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { Model, isValidObjectId } from "mongoose"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(id: string) {
    if (!isValidObjectId(id)) throw new NotFoundException("User not found")

    const user = await this.userModel.where({ _id: id }).findOne()
    if (!user) throw new NotFoundException("User not found")
    return user
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email })

    if (!user) throw new NotFoundException("User not found")

    return user
  }

  async findUserInfo(email: string) {
    const user = await this.findOneByEmail(email)

    return {
      id: user.id,
      email: user.email,
    }
  }
}
