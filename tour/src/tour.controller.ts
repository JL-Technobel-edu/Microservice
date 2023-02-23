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
import { TourService } from './tour.service';
import { ExceptionFilter , MongoExceptionFilter,MongooseExceptionFilter} from './filters';



@UseFilters(ExceptionFilter,MongoExceptionFilter,MongooseExceptionFilter)
@Controller()
export class TourController {
  constructor(private readonly tourService: TourService) {}



  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ role: 'tour', cmd: 'create' })
  create(@Payload() dto: any) {
    return this.tourService.create(dto);
  }


  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'tour', cmd: 'findone' })
  findOne(@Payload() dto: any) {
    return this.tourService.findOne(dto);
  }

  // @HttpCode(HttpStatus.OK)
  // @MessagePattern({ role: 'tour', cmd: 'update-housing' })
  // updateHousing(@Payload() dto: any) {
  //   console.log(dto)
  //   return this.tourService.updateHousing(dto);
  // }


  // @HttpCode(HttpStatus.CREATED)
  // @MessagePattern({ role: 'tour', cmd: 'add-housing' })
  // addHousing(@Payload() dto: any) {
  //   return this.tourService.addHousing(dto);
  // }
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
  // logout(@GetCurrentTourId() tourId: string) {
  //   return this.authService.logout(tourId);
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
  //   @GetCurrentTourId() tourId: string,
  //   @GetTour('refreshToken') refreshToken: string,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   return this.authService.refreshTokens(tourId, refreshToken);
  // }
}
