import { Module } from "@nestjs/common"
import { UsersService } from "./users.service"
import { UsersController } from "./users.controller"
import { ColumnsModule } from "src/columns/columns.module"
import { BoardsModule } from "src/boards/boards.module"
import { MongooseModule } from "@nestjs/mongoose"
import { UserSchema } from "./schemas/user.schema"

@Module({
  imports: [
    BoardsModule,
    ColumnsModule,
    MongooseModule.forFeature([
      {
        name: "User",
        schema: UserSchema,
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
