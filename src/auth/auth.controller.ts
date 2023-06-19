import { Body, Controller, Post } from "@nestjs/common"
import { CreateUserDto } from "src/users/dto/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "src/users/dto/login-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("signin")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }
}
