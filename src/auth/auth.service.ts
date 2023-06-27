import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtService } from "@nestjs/jwt"
import { InjectModel } from "@nestjs/mongoose"
import { Model, MongooseError } from "mongoose"
import { CreateUserDto } from "./dtos/create-user.dto"
import { User } from "src/users/schemas/user.schema"
import * as argon2 from "argon2"
import { LoginUserDto } from "./dtos/login-user.dto"
import { LogoutUserDto } from "./dtos/logout-user.dto"

@Injectable()
export class AuthService {
  private readonly revokedTokens: string[] = []

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    }

    return this.jwt.signAsync(payload, {
      expiresIn: "1h",
    })
  }

  // async validateUser (payload){}

  async login(user: LoginUserDto) {
    const currentUser = await this.userModel.findOne({ email: user.email })
    if (!currentUser) throw new BadRequestException("User not found")

    const isPasswordValid = await argon2.verify(
      currentUser.password,
      user.password,
    )
    if (!isPasswordValid) throw new BadRequestException("Invalid password")

    const token = await this.signToken(currentUser.id, currentUser.email)

    return {
      access_token: token,
      user: {
        id: currentUser.id,
        email: currentUser.email,
      },
    }
  }

  async logout(user: LogoutUserDto) {
    // TODO: Implement logout by invalidating the token
    this.revokedTokens.push(user.token)
  }

  async register(user: CreateUserDto) {
    const hashedPassword = await argon2.hash(user.password)

    try {
      const newUser = await this.userModel.create({
        ...user,
        password: hashedPassword,
      })

      delete newUser.password
      return newUser
    } catch (err) {
      if (err instanceof MongooseError) {
        throw new InternalServerErrorException("Database error")
      } else {
        throw new BadRequestException(err.message)
      }
    }
  }
}
