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
import { PaymentService } from './payment.service';
import { ExceptionFilter , MongoExceptionFilter} from './filters';


@UseFilters(new ExceptionFilter,new MongoExceptionFilter())
@Controller()
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}



  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ role: 'payment', cmd: 'create' })
  create(dto: any) {
    return this.paymentService.create(dto);
  }


  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'payment', cmd: 'findone' })
  findOne(dto: any) {
    return this.paymentService.findOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'payment', cmd: 'updateone' })
  updateOne(dto: any) {
    return this.paymentService.updateOne(dto.paymentId,dto.prop);
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
  // logout(@GetCurrentPaymentId() paymentId: string) {
  //   return this.authService.logout(paymentId);
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
  //   @GetCurrentPaymentId() paymentId: string,
  //   @GetPayment('refreshToken') refreshToken: string,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   return this.authService.refreshTokens(paymentId, refreshToken);
  // }
}
