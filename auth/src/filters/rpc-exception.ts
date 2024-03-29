import { Catch, RpcExceptionFilter, ArgumentsHost, HttpException, HttpCode, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class ExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log(exception.getError())    
    return throwError(() => exception.getError());
  }
}