import { AuthGuard } from "@nestjs/passport"

export class JwtAtGuard extends AuthGuard("jwt-at") {
  constructor() {
    super()
  }
}
