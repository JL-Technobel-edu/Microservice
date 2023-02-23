import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './user.service';
import { MongooseService } from './mongoose/mongoose.service';
import { UserController } from './user.controller';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [ 
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongooseService,
    }),
     MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
    ]), 
  ],
  controllers: [UserController],
  providers: [UserService],

})
export class UserModule {}
