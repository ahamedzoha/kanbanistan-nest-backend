import { Module } from "@nestjs/common"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { DatabaseConnectionModule } from "./database-connection/database-connection.module"
import { ConfigModule } from "./config/config.module"
import { UsersModule } from "./users/users.module"
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, DatabaseConnectionModule, UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
