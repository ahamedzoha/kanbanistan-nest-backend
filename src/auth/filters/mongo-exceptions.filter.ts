import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from "@nestjs/common"
import { MongoError } from "mongodb"

@Catch()
export class MongoExceptionsFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {
    switch (exception.code) {
      case 11000:
        return "Email already exists"
      default:
        throw new BadRequestException(exception.message)
    }
  }
}
