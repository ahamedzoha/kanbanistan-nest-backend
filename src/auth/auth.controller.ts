import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dtos/login-user.dto"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("signin")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("signup")
  async signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto)
  }
}
