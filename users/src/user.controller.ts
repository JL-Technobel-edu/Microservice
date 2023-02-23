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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { ExceptionFilter , MongoExceptionFilter} from './filters';


@UseFilters(new ExceptionFilter,new MongoExceptionFilter())
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}



  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ role: 'user', cmd: 'create' })
  create(@Payload() payload: any) {
    return this.userService.create(payload);
  }


  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'user', cmd: 'findone' })
  findOne(@Payload() payload: any) {
    return this.userService.findOne(payload);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'user', cmd: 'updateone' })
  updateOne(@Payload() payload: any) {
    return this.userService.updateOne(payload.userId,payload.prop);
  }
  // @Get('confirm/:token')
  // @HttpCode(HttpStatus.OK)
  // confirm(@Param('token') token: string) {
  //   return this.authService.confirm(token);
  // }

  // @Post('check')
  // @HttpCode(HttpStatus.OK)
  // check(@Body() dto: any) {
  //   return this.authService.check(dto.token);
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

  // @HttpCode(HttpStatus.OK)
  // @Post('signin')
  // async signin(@Body() dto: AuthDto) {
  //   const jwtToken = await this.authService.signin(dto);
  //   return jwtToken;
  // }

  // @UseGuards(JwtRefreshGuard)
  // @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  // refreshTokens(
  //   @GetCurrentUserId() userId: string,
  //   @GetUser('refreshToken') refreshToken: string,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   return this.authService.refreshTokens(userId, refreshToken);
  // }
}
