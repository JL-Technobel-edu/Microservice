import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TourService } from './tour.service';
import { MongooseService } from './mongoose/mongoose.service';
import { TourController } from './tour.controller';
import { Tour, TourSchema } from './schemas/tour.schema';
import { Housing, HousingSchema } from './schemas/housing.schema';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
     MongooseModule.forFeature([
      { name: Tour.name, schema: TourSchema },
      { name: Housing.name, schema: HousingSchema },
    ]), 
  ],
  controllers: [TourController],
  providers: [TourService],

})
export class TourModule {}
