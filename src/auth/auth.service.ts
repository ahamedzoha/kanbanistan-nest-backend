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
import { TokenizedUser } from "./types/tokenized-user.types"

@Injectable()
export class AuthService {
  private readonly revokedTokens: string[] = []

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(userDto: CreateUserDto): Promise<TokenizedUser> {
    const existingUser = await this.userModel.exists({ email: userDto.email })
    if (existingUser) throw new BadRequestException("User already exists")

    const hashedPassword = await this.hashData(userDto.password)

    try {
      const newUser = await this.userModel.create({
        ...userDto,
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

  async refresh(user: LoginUserDto) {
    const currentUser = await this.userModel.findOne({ email: user.email })
    if (!currentUser) throw new BadRequestException("User not found")

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

  async hashData(data: string): Promise<string> {
    return await argon2.hash(data)
  }
}
