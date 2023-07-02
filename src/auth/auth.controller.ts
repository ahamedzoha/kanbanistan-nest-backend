import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common"
import { CreateUserDto } from "./dtos/create-user.dto"
import { AuthService } from "./auth.service"
import { LoginUserDto } from "./dtos/login-user.dto"
import { LogoutUserDto } from "./dtos/logout-user.dto"
import { TokenizedUser } from "./types/tokenized-user.types"
import { JwtAtGuard } from "./guards/jwt-at.guard"
import { JwtRtGuard } from "./guards/jwt-rt.guard"
import { GetUser } from "./decorators/get-user.decorator"
import { RefreshUserDto } from "./dtos/refresh-user.dto"

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

  @UseGuards(JwtAtGuard)
  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@GetUser() user: LogoutUserDto) {
    return this.authService.logout(user)
  }

  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(@GetUser() user: RefreshUserDto) {
    console.log(user)
    return this.authService.refresh(user.sub, user.refreshToken)
  }
}
