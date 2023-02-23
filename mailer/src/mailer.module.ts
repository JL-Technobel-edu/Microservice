import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailerController } from './mailer.controller';
import { SendgridService } from './services/sendgrid.service';


@Module({
  imports: [    
    ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [MailerController],
  providers: [SendgridService],
})
export class MailerModule {}
