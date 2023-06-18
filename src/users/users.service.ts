import { Injectable, NotFoundException } from "@nestjs/common"
import { CreateUserDto } from "./dto/create-user.dto"
import { UpdateUserDto } from "./dto/update-user.dto"
import { InjectModel } from "@nestjs/mongoose"
import { User } from "./schemas/user.schema"
import { Model, isValidObjectId } from "mongoose"

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  create(createUserDto: CreateUserDto) {
    const user = this.userModel.create(createUserDto)
    return user
  }

  findAll() {
    return `This action returns all users`
  }

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

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
