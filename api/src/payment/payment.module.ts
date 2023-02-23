import { Module } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { PaymentController } from './payment.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports:[    ClientsModule.register([
    { name: 'AUTH_CLIENT',      
      options: {
        port: 3020,
        host: 'localhost',
      }, 
      transport: Transport.TCP 
    },
    { name: 'USER_CLIENT',
      options: {
        port: 3030,
        host: 'localhost',
      }, 
      transport: Transport.TCP 
    },
    { name: 'MAILER_CLIENT',
    options: {
      port: 3040,
      host: 'localhost',
    }, 
    transport: Transport.TCP 
  },
  { name: 'HOUSING_CLIENT',
    options: {
      port: 3050,
      host: 'localhost',
    }, 
  },
  { name: 'TOUR_CLIENT',
    options: {
      port: 3060,
      host: 'localhost',
    }, 
    transport: Transport.TCP 
  },
  { name: 'PAYMENT_CLIENT',
  options: {
    port: 3070,
    host: 'localhost',
  }, 
  transport: Transport.TCP 
  },
  ]),
],
  controllers: [PaymentController],
  providers: [PaymentService]
})
export class PaymentModule {}
