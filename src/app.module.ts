import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseConnectionModule } from './database-connection/database-connection.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule, DatabaseConnectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
