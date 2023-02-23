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
import { SendgridService } from './services/sendgrid.service';
import { ExceptionFilter } from './filters';


@UseFilters(new ExceptionFilter)
@Controller()
export class MailerController {
  constructor(private readonly sendgridService: SendgridService) {}



  @HttpCode(HttpStatus.CREATED)
  @MessagePattern({ role: 'mailer', cmd: 'confirmation', action:"signup" })
  signupConfirmation(dto: any) {
    return this.sendgridService.signupConfirmation(dto);
  }


}
