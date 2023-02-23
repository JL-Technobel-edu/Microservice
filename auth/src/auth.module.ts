import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtConfigService } from './config/jwt-config.service';
//import { AuthService } from './auth.service';
import { MongooseService } from './mongoose/mongoose.service';
import { User, UserSchema } from './schemas/user.schema';
import {  JwtRefreshStrategy, JwtStrategy } from './strategy';


@Module({
  imports: [ 
    JwtModule.register({}),
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
  controllers: [AuthController],
  //providers: [AuthService, JwtStrategy, JwtRefreshStrategy],
  providers: [AuthService,JwtStrategy, JwtRefreshStrategy,JwtConfigService],

})
export class AuthModule {}
