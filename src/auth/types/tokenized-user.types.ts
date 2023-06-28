import { OmitType } from "@nestjs/mapped-types"
import { User } from "src/users/schemas/user.schema"

export type Token = {
  access_token: string
  refresh_token: string
}

export type SanitizedUser = Omit<User, "password">

export type TokenizedUser = SanitizedUser & Token
