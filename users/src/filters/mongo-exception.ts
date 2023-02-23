import { ArgumentsHost, Catch, ConflictException,  ExceptionFilter, HttpException, HttpStatus, NotFoundException, RpcExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
@Catch(MongoError)
export class MongoExceptionFilter implements ExceptionFilter {
  catch(exception: MongoError, host: ArgumentsHost) {

    switch (exception.code) {
      case 11000:
        return throwError(() => new RpcException( {
          status: HttpStatus.CONFLICT,
          message: exception.message,
          name:'Conflict'
        },).getError());
        

        // duplicate exception
        // do whatever you want here, for instance send error to client
    }
  }
}