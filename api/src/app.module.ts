import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ToursModule } from './tours/tours.module';
import { HousingModule } from './housing/housing.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [    
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    ToursModule,
    HousingModule,
    PaymentModule,
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
