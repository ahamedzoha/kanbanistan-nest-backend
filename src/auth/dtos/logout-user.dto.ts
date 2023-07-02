import { IsNotEmpty, IsString } from "class-validator"

export class LogoutUserDto {
  @IsString()
  @IsNotEmpty()
  sub: string
}
