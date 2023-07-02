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
import { Token, TokenizedUser } from "./types/tokenized-user.types"

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(userDto: CreateUserDto): Promise<TokenizedUser> {
    const hashedPassword = await this.hashData(userDto.password)

    try {
      const newUser = await this.userModel.create({
        ...userDto,
        password: hashedPassword,
      })
      const token = await this.getTokens(newUser.id, newUser.email)
      await this.updateRefreshTokenHash(newUser.id, token.refresh_token)
      const sanitizedUser = { ...newUser.toObject(), password: "hidden" }
      return { ...sanitizedUser, ...token }
    } catch (err) {
      if (err instanceof MongooseError) {
        throw new InternalServerErrorException("Database error")
      } else {
        throw new BadRequestException(err.message)
      }
    }
  }

  async login(user: LoginUserDto): Promise<TokenizedUser> {
    const currentUser = await this.userModel.findOne({ email: user.email })
    if (!currentUser) throw new BadRequestException("User not found")

    const isPasswordValid = await argon2.verify(
      currentUser.password,
      user.password,
    )
    if (!isPasswordValid) throw new BadRequestException("Invalid password")

    const token = await this.getTokens(currentUser.id, currentUser.email)
    await this.updateRefreshTokenHash(currentUser.id, token.refresh_token)

    const sanitizedUser = { ...currentUser.toObject(), password: "hidden" }

    return {
      ...sanitizedUser,
      ...token,
    }
  }

  async logout(user: LogoutUserDto) {
    try {
      await this.userModel.updateMany(
        {
          _id: user.sub,
          refreshToken: { $ne: null },
        },
        {
          $set: { refreshToken: null },
        },
      )

      return {
        message: "Logout successful",
        code: 200,
      }
    } catch (err) {
      if (err instanceof MongooseError) {
        throw new InternalServerErrorException("Database error")
      } else {
        throw new BadRequestException(err.message)
      }
    }
  }

  async refresh(userId: string, refreshToken: string) {
    const user = await this.userModel.findById(userId)
    if (!user) throw new BadRequestException("User not found")

    if (!user.refreshToken)
      throw new BadRequestException("Invalid refresh token")

    const rtMatches = await argon2.verify(user.refreshToken, refreshToken)
    if (!rtMatches) throw new BadRequestException("Invalid refresh token")

    const token = await this.getTokens(user.id, user.email)
    await this.updateRefreshTokenHash(user.id, token.refresh_token)

    return token
  }

  // Helper functions

  async getTokens(userId: string, email: string): Promise<Token> {
    const [at, rt] = await Promise.all([
      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: "15min",
          secret: this.configService.get<string>("JWT_AT_SECRET"),
        },
      ),

      this.jwt.signAsync(
        {
          sub: userId,
          email,
        },
        {
          expiresIn: 60 * 60 * 24 * 7,
          secret: this.configService.get<string>("JWT_RT_SECRET"),
        },
      ),
    ])

    return {
      access_token: at,
      refresh_token: rt,
    }
  }

  async hashData(data: string): Promise<string> {
    return await argon2.hash(data)
  }

  async updateRefreshTokenHash(userId: string, refreshToken: string) {
    const hash = await this.hashData(refreshToken)

    await this.userModel.updateOne({ _id: userId }, { refreshToken: hash })
  }
}
