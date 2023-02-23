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
import { HousingService } from './housing.service';
import { ExceptionFilter , MongoExceptionFilter} from './filters';
import * as _ from 'lodash';
import { HousingClass } from './class/housing.class';
import * as moment from 'moment';

@UseFilters(new ExceptionFilter,new MongoExceptionFilter())
@Controller()
export class HousingController {
  constructor(private readonly housingService: HousingService) {}



  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ role: 'housing', cmd: 'create' })
  create(dto: any) {
    return this.housingService.create(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'check' })
  check(@Payload() dto: any) {
    return this.housingService.check(this.housingService.findAllRangeDate(dto));
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'findone' })
  findOne(@Payload() dto: any) {
    return this.housingService.findOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'info' })
  async info(@Payload() dto: any) {
    console.log(dto)   
     if(!dto.from)
    {
      dto.from = moment(new Date()).locale('fr').format("L");
      dto.to = moment(new Date()).locale('fr').add(1, 'days').format("L");
    }
    const housing:any = await this.housingService.findOne(dto);
    const authorizedDate = housing.availability.filter((e:any)=>{
      console.log(new Date(e.period))
      console.log(new Date(dto.from))
      if(new Date(e.period) >= new Date(dto.from) &&  new Date(e.period)  <= new Date(dto.to))
return new Date(e.period)

    }

    )
    console.log(authorizedDate)

    const price = _.meanBy(authorizedDate,(e:any)=> e.price)
    const total = price * (dto.capacity || 2) * authorizedDate.length
    console.log({price,total,from:new Date(dto.from),to:new Date(dto.to)})
    console.log(dto)
    return {price,total,from:dto.from,to:dto.to}
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'findall' })
  findAll(@Payload() dto: any) {
    return this.housingService.findAll(this.housingService.findAllRangeDate(dto));
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'updateone' })
  updateOne(@Payload() dto: any) {
    return this.housingService.updateOne(dto);
  }

  @HttpCode(HttpStatus.OK)
  @MessagePattern({ role: 'housing', cmd: 'pushone' })
  pushOne(@Payload() dto: any) {
    return this.housingService.pushOne(dto);
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
  // logout(@GetCurrentHousingId() housingId: string) {
  //   return this.authService.logout(housingId);
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
  //   @GetCurrentHousingId() housingId: string,
  //   @GetHousing('refreshToken') refreshToken: string,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   return this.authService.refreshTokens(housingId, refreshToken);
  // }
}
