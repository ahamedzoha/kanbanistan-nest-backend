import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dtos/login-user.dto"
import { LogoutUserDto } from "./dtos/logout-user.dto"
import { TokenizedUser } from "./types/tokenized-user.types"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post("local/signin")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @HttpCode(HttpStatus.CREATED)
  @Post("local/signup")
  async signup(@Body() createUserDto: CreateUserDto): Promise<TokenizedUser> {
    return this.authService.signup(createUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@Body() logoutUserDto: LogoutUserDto) {
    return this.authService.logout(logoutUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(@Body() loginUserDto: LoginUserDto) {
    return this.authService.refresh(loginUserDto)
  }
}
