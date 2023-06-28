import { User } from "src/users/schemas/user.schema"

type Token = {
  access_token: string
  refresh_token: string
}

export type TokenizedUser = Token & User
