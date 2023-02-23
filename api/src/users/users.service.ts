import { HttpException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CodeStatus } from './interfaces';

@Injectable()
export class UsersService {

  constructor(
    @Inject('USER_CLIENT') private userClient: ClientProxy,
    @Inject('AUTH_CLIENT') private authClient: ClientProxy,
    @Inject('MAILER_CLIENT') private mailerClient: ClientProxy,
    private config: ConfigService,
    ){}

  async signin(dto: any) {

    const user = await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'findone' },
        { email: dto.email,deletedAt:null,isActive:{$ne:null}}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );

    const auth =  await firstValueFrom(
      this.authClient.send(
        {role:'auth', cmd: 'signin' }, 
        { userId: user.id}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );


     await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'updateone' },
        { userId: user.id,prop:{ refreshToken: auth.refresh_token}},
        
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    return auth;
  }

  async signup(dto: any,url:string) {
    const user = await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'create' },
         dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );

    const {activation_token} =  await firstValueFrom(
      this.authClient.send(
        {role:'auth', cmd: 'signup' }, 
        { userId: user.id}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    await firstValueFrom(
      this.mailerClient.send(
        {role:'mailer', cmd: 'confirmation',action:"signup" }, 
        { email: user.email,token:activation_token,baseUrl:url}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );    

     await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'updateone' },
        { userId: user.id,prop:{ activationToken: activation_token}},
        
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    const mail = await firstValueFrom(
      this.mailerClient.send(
        {role:'mailer', cmd: 'confirmation',action:"signup" }, 
        { email: user.email,token:activation_token,baseUrl:url}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );  
    console.log(mail)
    return {activation_token};
  }


  async refresh(dto: any) {
    const user= await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'findone' },
        { refreshToken: dto.refresh_token}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    
    return await firstValueFrom(
      this.authClient.send(
        {role:'auth', cmd: 'refresh' },
        {refresh_token: user.refreshToken}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }

  async activation(dto: any) {
    console.log(dto)
    const user = 
    await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'updateone' },
        {userId:dto, prop:{isActive: false,codeStatus : CodeStatus.PROFILE,$unset:{activationToken : 1}}}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    return user;
  }

  async decode(token: any) {

    return await firstValueFrom(
      this.authClient.send(
        {role:'auth', cmd: 'decode' },
        token
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }

  async profile(dto: any) {
    const user = await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'findone' },
        { _id: dto}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );

    return user;
  }



  async logout(dto: any) {
    const decodedToken = await this.decode(dto.refresh_token)

    await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'updateone' },
        {userId:decodedToken, prop:{refreshToken: null}}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );

    return true;
  }


  async updateProfile(id: string, updateUserDto: UpdateUserDto) {
 
    const user = 
    await firstValueFrom(
      this.userClient.send(
        {role:'user', cmd: 'updateone' },
        {userId:id, prop:{isActive: true,codeStatus : CodeStatus.COMPLETED,...updateUserDto}}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    return user;
    return updateUserDto;
  }


  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }



  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
