import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService) {
    SendGrid.setApiKey(this.configService.get<string>('SEND_GRID_KEY'));
  }


  async signupConfirmation(dto:any) {
    const m = {
      from: {
        email: 'jawad.lakrary@edu.technobel.be',
      },
      personalizations: [
        {
          to: [
            {
              email: dto.email,
            },
          ],
          dynamicTemplateData: {
            token: dto.token,
            baseUrl : dto.baseUrl
          },
        },
      ],
      templateId: 'd-a586f93947cd43ec8f76c41bc75e2973',
    };    
    Logger.log(
      `Email successfully dispatched to ${dto.email}`,
    );
    return await this.send(m);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);

    console.log(
      `Email successfully dispatched to ${mail.personalizations[0].to[0].email}`,
    );
    return transport;
  }
}
