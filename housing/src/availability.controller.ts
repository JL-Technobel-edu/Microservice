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
  import { ExceptionFilter , MongoExceptionFilter} from './filters';
import { AvailabilityService } from './availability.service';
import { HousingService } from './housing.service';
  
  
  @UseFilters(new ExceptionFilter,new MongoExceptionFilter())
  @Controller()
  export class AvailabilityController {
    constructor(private readonly housingService: HousingService,private readonly avService: AvailabilityService) {}
  
  
  
    @HttpCode(HttpStatus.CREATED)
    @MessagePattern({ role: 'availability', cmd: 'create' })
    create(dto: any) {
      return this.avService.create(dto);
    }
  
  
    @HttpCode(HttpStatus.OK)
    @MessagePattern({ role: 'availability', cmd: 'findone' })
    findOne(@Payload() dto: any) {
      return this.avService.findOne(dto);
    }


  
  
    @HttpCode(HttpStatus.OK)
    @MessagePattern({ role: 'availability', cmd: 'findall' })
    findAll(@Payload() dto: any) {
      console.log('findall')
      return this.avService.findAll(dto);
    }
  
    @HttpCode(HttpStatus.OK)
    @MessagePattern({ role: 'availability', cmd: 'updateone' })
    updateOne(@Payload() dto: any) {
      return this.avService.updateOne(dto);
    }
  
    @HttpCode(HttpStatus.OK)
    @MessagePattern({ role: 'availability', cmd: 'pushone' })
    pushOne(@Payload() dto: any) {
      return this.avService.pushOne(dto);
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
  