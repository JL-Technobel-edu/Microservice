import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { GetCurrentUserId } from './decorators/get-user-current-id.decorator';
import { GetUser } from './decorators/get-user.decorator';
import { AuthDto, ConfirmDto, SignupDto } from './dto';
import { ActivationDto } from './dto/activation.dto';
import { MongoExceptionFilter,ExceptionFilter } from './filters';

import { JwtGuard, JwtRefreshGuard } from './guards';

@UseFilters(new ExceptionFilter,new MongoExceptionFilter())
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'auth', cmd: 'signup' })
  signup(dto: any): Promise<any> {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'auth', cmd: 'signin' })
  signin(dto: any): Promise<{ access_token: string;refresh_token: string; }> {

    return this.authService.signin(dto);
  }

  @HttpCode(HttpStatus.OK)  
  @UseGuards(JwtGuard)
  @MessagePattern({ role: 'auth', cmd: 'verify' })
  verify(@GetUser() t:any,dto:any ): Promise<{ id: string; }> {
    return this.authService.verifyToken(t);
  }


  @HttpCode(HttpStatus.OK)  
  @MessagePattern({ role: 'auth', cmd: 'decode' })
  decode(dto:any ): Promise<{ userId: string; }> {

    return this.authService.decodeToken(dto);
  }


  @HttpCode(HttpStatus.OK) 
  @UseGuards(JwtRefreshGuard)
  @MessagePattern({ role: 'auth', cmd: 'refresh' })
  refresh(dto:any ): Promise<any> {
    return this.authService.refresh(dto);
  }
  // @Get('confirm/:token')
  // @HttpCode(HttpStatus.OK)
  // confirm(@Param('token') token: string) {
  //   return this.authService.confirm(token);
  // }


  // @Post('activation')
  // @HttpCode(HttpStatus.OK)
  // activation(@Body() dto: ActivationDto) {
  //   return this.authService.activation(dto);
  // }

  // @UseGuards(JwtRefreshGuard)
  // @Post('logout')
  // @HttpCode(HttpStatus.OK)
  // logout(@GetCurrentUserId() userId: string) {
  //   return this.authService.logout(userId);
  // }


}
