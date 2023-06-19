import { Module } from "@nestjs/common"
import { AuthService } from "./auth.service"
import { AuthController } from "./auth.controller"
import { JwtModule } from "@nestjs/jwt"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "src/users/schemas/user.schema"
import { JwtStrategy } from "./strategies/jwt.strategy"

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema,
      },
    ]),
    JwtModule.register({}),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
