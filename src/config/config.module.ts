import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.production'],
      isGlobal: true,
    }),
  ],
  exports: [NestConfigModule],
})
export class ConfigModule {}
console.log('config module', process.env.MONGODB_URI);
