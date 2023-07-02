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
import { JwtRtGuard } from "./guards/jwt-rt.guard"
import { GetUser } from "./decorators/get-user.decorator"
import { RefreshUserDto } from "./dtos/refresh-user.dto"
import { Public } from "./decorators/public.decorator"

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post("local/signin")
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto)
  }

  @Public()
  @HttpCode(HttpStatus.CREATED)
  @Post("local/signup")
  async signup(@Body() createUserDto: CreateUserDto): Promise<TokenizedUser> {
    return this.authService.signup(createUserDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post("logout")
  async logout(@GetUser() user: LogoutUserDto) {
    return this.authService.logout(user)
  }

  @Public()
  @UseGuards(JwtRtGuard)
  @HttpCode(HttpStatus.OK)
  @Post("refresh")
  async refresh(@GetUser() user: RefreshUserDto) {
    return this.authService.refresh(user.sub, user.refreshToken)
  }
}
