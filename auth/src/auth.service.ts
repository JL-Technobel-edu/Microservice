import { ForbiddenException, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import * as argon from 'argon2';
import { AuthDto, ConfirmDto, SignupDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as BSON from 'bson';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from 'mongoose';

import { JwtConfigService } from './config/jwt-config.service';


@Injectable()
export class AuthService {

  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwt: JwtService,
    //private config: ConfigService,
    private jwtConfig: JwtConfigService,

  ) {}

  async signup(dto: any,): Promise<{ activation_token: string;  }> {
    const payload = {
      sub: dto.userId,
    };
    const activation_token = await this.signToken(payload, 'ACT');
    return {activation_token};
  }

  async signin(dto: any,): Promise<{ access_token: string; refresh_token: string; }> {
    const payload = {
      sub: dto.userId,
    };
    const [access_token, refresh_token] = await Promise.all([
      this.signToken(payload, 'JWT'),
      this.signToken(payload, 'RFT'),
    ]);
    
    return {access_token, refresh_token};
  }



  async refresh(
    token: any,
  ): Promise<{ access_token: string; }> {

    const decodedToken = await this.decodeToken(token.refresh_token);
    const payload = {
      sub: decodedToken,
    };


    const access_token = 
      await this.signToken(payload, 'JWT');

    return {
      access_token
    };      


  }


  async signToken(payload:any,jwtCfg: any,): Promise<string> {
      const token = await this.jwt.signAsync(payload, this.jwtConfig.get(jwtCfg).options);
      return token;   
  }


  async verifyToken(token: any) :Promise<{id:string;}>{
    return {
      id:token.sub,
    }
  }

 async decodeToken(token: string) {

      const tokenData = this.jwt.decode(token) as {exp: number, sub: any};
      if (!tokenData) {

        throw new RpcException({
          status: HttpStatus.BAD_REQUEST,
          message: 'Token not valid',
          name:'BadRequestException'
        })
   
      }
      //console.log(tokenData)
      return tokenData.sub;
      



  }
  async signCheckout(dto: any,): Promise<{ checkout_token: string;  }> {
    const payload = {
      sub: dto.userId,
    };
    const checkout_token = await this.signToken(payload, 'CHK');
    return {checkout_token};
  }
  // async signin(dto: AuthDto) {

  //   const tokens = await this.signToken(user);
  //   return tokens;
  // }

  // async confirm(token: string) {
  //   try {
  //     const v = await this.jwt.verify(token, {
  //       secret: 'ACT_JWT_SECRET',
  //     });

  //     const user = await this.userRepository.findOneBy({
  //       _id: new BSON.ObjectId(v.sub),
  //     });

  //     if (!user) {
  //       throw new ForbiddenException('Account not found');
  //     }
  //     const pwm = await argon.verify(user.activationToken, token);
  //     if (!pwm) {
  //       throw new ForbiddenException(`Token doesn't match`);
  //     }
  //     await this.userRepository.update(
  //       {
  //         _id: user._id,
  //       },
  //       {
  //         activationToken: null,
  //         isActive: true,
  //       },
  //     );
  //     const tokens = await this.signToken(user);
  //     await this.updateRtHash(user._id, tokens.refresh_token);
  //     return tokens;
  //   } catch (error) {
  //     if (error.name == 'TokenExpiredError') {
  //       throw new ForbiddenException('Token has expired' + error);
  //     }
  //     throw error;
  //   }
  // }

  // async check(token: string) {
  //   try {
  //     const v = await this.jwt.verify(token, {
  //       secret: 'ACT_JWT_SECRET',
  //     });
  //     return v;
  //   } catch (error) {
  //     if (error.name == 'TokenExpiredError') {
  //       throw new ForbiddenException('Token has expired' + error);
  //     }
  //     if (error.name == 'JsonWebTokenError') {
  //       throw new ForbiddenException('Jwt token malformed');
  //     }
  //     throw error;
  //   }
  // }





  // async refreshTokens(userId: string, rt: string): Promise<any> {


  //   const tokens = await this.signToken(user);

  //   return tokens;
  // }



  // async signToken(
  //   user: User,
  // ): Promise<{ access_token: string; refresh_token: string }> {
  //   const payload = {
  //     sub: user._id,
  //     email: user.email,
  //   };
  //   const [at, rt] = await Promise.all([
  //     this.jwt.signAsync(payload, {
  //       secret: this.config.get<string>('JWT_SECRET'),
  //       expiresIn: '1m',
  //     }),
  //     this.jwt.signAsync(payload, {
  //       secret: this.config.get<string>('RT_JWT_SECRET'),
  //       expiresIn: '7d',
  //     }),
  //   ]);

  //   return {
  //     access_token: at,
  //     refresh_token: rt,
  //   };
  // }
}
