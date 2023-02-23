import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { RpcException } from '@nestjs/microservices';
import { throwError } from 'rxjs';
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToRpc();

    const status = exception.getStatus();
    return throwError(() => new RpcException({
        status: status,
        message: exception.message,
        name:exception.name
      }));
  }
}