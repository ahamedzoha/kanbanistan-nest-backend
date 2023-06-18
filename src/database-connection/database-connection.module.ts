import { Global, Module } from "@nestjs/common"
import { MongooseModule, MongooseModuleFactoryOptions } from "@nestjs/mongoose"
import { ConfigModule, ConfigService } from "@nestjs/config"

/**
 * @description
 * This module is responsible for connecting to the database.
 * We use the `@Global()` decorator to make this module available
 * to the entire application.
 * We use the `@Module()` decorator to define the module.
 * We use the `@MongooseModule.forRootAsync()` decorator to
 * asynchronously connect to the database.
 * We use the `@ConfigService` to get the MONGODB_URI from the
 * environment variables.
 * We use the `@ConfigModule` to make the ConfigService available
 * to the entire application.
 * @export
 * class DatabaseConnectionModule
 * @summary
 * We use the `@Global()` decorator to make this module available
 * @see https://docs.nestjs.com/modules#global-modules
 */
@Global()
@Module({
  imports: [
    ConfigModule,
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>("MONGODB_URI"),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [MongooseModule],
})
export class DatabaseConnectionModule {}
console.log("database connections", process.env.MONGODB_URI)
