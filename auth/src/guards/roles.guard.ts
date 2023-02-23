// import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
// import { Reflector } from '@nestjs/core';
// import { ROLES_KEY } from 'src/user/decorators/roles.decorator';
// import { Role } from 'src/user/interfaces';
// import { JwtGuard } from './jwt.guard';

// @Injectable()
// export class RolesGuard extends JwtGuard implements CanActivate {
//   constructor(private reflector: Reflector) {
//     super();
//   }

//   canActivate(context: ExecutionContext): boolean {
//     const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
//       context.getHandler(),
//       context.getClass(),
//     ]);
//     if (!requiredRoles) {
//       return true;
//     }
//     const { user } = context.switchToHttp().getRequest();
//     console.log(user);
//     return requiredRoles.some((role) => user.roles?.includes(role));
//   }
// }
