import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { HousingService } from './housing.service';
import { MongooseService } from './mongoose/mongoose.service';
import { HousingController } from './housing.controller';
import { Housing, HousingSchema } from './schemas/housing.schema';
import { Availability, AvailabilitySchema } from './schemas/availability.schema';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
     MongooseModule.forFeature([
      { name: Housing.name, schema: HousingSchema },
      { name: Availability.name, schema: AvailabilitySchema },
    ]), 
  ],
  controllers: [HousingController,AvailabilityController],
  providers: [HousingService,AvailabilityService],

})
export class HousingModule {}
