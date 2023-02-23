import { ArgumentsHost, Catch, ConflictException,  ExceptionFilter,  HttpStatus, Logger, NotFoundException, RpcExceptionFilter } from '@nestjs/common';
import { throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import * as MongooseError  from 'mongoose/lib/error';
@Catch(MongooseError)
    export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongooseError, host: ArgumentsHost) {

    switch (exception.name) {
       case 'DocumentNotFoundError': {
        return throwError(() => new RpcException({
            status: HttpStatus.NOT_FOUND,
            message: exception.message,
            name:'DocumentNotFoundError'
          },
        ).getError());
       }
      // case 'MongooseError': { break; } // general Mongoose error
      // case 'CastError': { break; }
      // case 'DisconnectedError': { break; }
      // case 'DivergentArrayError': { break; }
      // case 'MissingSchemaError': { break; }
      // case 'ValidatorError': { break; }
       case 'ValidationError': {         return throwError(() => new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: exception.message,
        name:'ValidationError'
      },
    ).getError());}
      // case 'ObjectExpectedError': { break; }
      // case 'ObjectParameterError': { break; }
      // case 'OverwriteModelError': { break; }
      // case 'ParallelSaveError': { break; }
       case 'StrictModeError': { 
        return throwError(() => new RpcException({
            status: HttpStatus.BAD_REQUEST,
            message: exception.message,
            name:'StrictModeError'
          },
        ).getError());
    
        }
      // case 'VersionError': { break; }
      default: {
        return throwError(() => new RpcException({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: exception.message,
            name:'InternalServerError'
          },
        ).getError());
      }
    }
  }
}