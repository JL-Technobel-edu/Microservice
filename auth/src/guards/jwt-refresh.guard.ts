import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AuthGuard } from '@nestjs/passport';
// Create a new class extends AuthGuard for JWT which is called from the controllers
// AuthGuard('jwt') create an instance of AuthGuard for JWT
@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwt-refresh') {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    // You can throw an exception based on either "info" or "err" arguments

    if (info || !user) {
      throw new RpcException({
        status: HttpStatus.UNAUTHORIZED,
        message: info.message,
        name:info.name
      })
    }
    
    return user;
  }
}
