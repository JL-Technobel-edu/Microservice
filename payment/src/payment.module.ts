import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentService } from './payment.service';
import { MongooseService } from './mongoose/mongoose.service';
import { PaymentController } from './payment.controller';
import { Payment, PaymentSchema } from './schemas/payment.schema';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
     MongooseModule.forFeature([
      { name: Payment.name, schema: PaymentSchema },
    ]), 
  ],
  controllers: [PaymentController],
  providers: [PaymentService],

})
export class PaymentModule {}
