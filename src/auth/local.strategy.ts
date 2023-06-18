import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from "passport-local"
import { AuthService } from "./auth.service"
import { UnauthorizedException } from "@nestjs/common"

export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameFiled: "email" })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password)

    if (!user) throw new UnauthorizedException("incorrect email or password")
    return user
  }
}
