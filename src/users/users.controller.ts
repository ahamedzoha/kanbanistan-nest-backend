import { Body, Controller, Get } from "@nestjs/common"
import { UsersService } from "./users.service"

import { GetUser } from "src/auth/decorators/get-user.decorator"
import { User } from "./schemas/user.schema"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get("me")
  // async userInfo(@Body("email") email: string) {
  //   return await this.usersService.findUserInfo(email)
  // }

  @Get("me")
  async userInfo(@GetUser() user: User) {
    return user
  }

  // @Get("me")
  // async userInfo(@GetUser("email") email: string) {
  //   return email
  // }
}
