import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { ClientProxy } from '@nestjs/microservices';
  import { catchError, firstValueFrom, Observable, of, switchMap } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(
      @Inject('AUTH_CLIENT') private readonly authClient: ClientProxy,
    ) {}
  
    canActivate(
      context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
      if (context.getType() !== 'http') {
        return false;
      }
  
      const authHeader = context.switchToHttp().getRequest().headers[
        'authorization'
      ] as string;
  
      if (!authHeader) return false;
  
      const authHeaderParts = authHeader.split(' ');
  
      if (authHeaderParts.length !== 2) return false;
  
      const [, access_token] = authHeaderParts;
  
      return this.authClient.send({role:'auth', cmd: 'verify' }, { access_token }).pipe(

        catchError(() => {
          throw new UnauthorizedException();
        }),
      );
    }
  }