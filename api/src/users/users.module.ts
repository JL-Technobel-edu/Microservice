import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule } from '@nestjs/config';

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
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
