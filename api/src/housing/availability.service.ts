import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, catchError } from 'rxjs';
import { AvailabilityDto } from './dto';
@Injectable()
export class AvailabilityService {



    constructor(
        @Inject('USER_CLIENT') private userClient: ClientProxy,
        @Inject('AUTH_CLIENT') private authClient: ClientProxy,
        @Inject('MAILER_CLIENT') private mailerClient: ClientProxy,
        @Inject('TOUR_CLIENT') private tourClient: ClientProxy,
        @Inject('HOUSING_CLIENT') private housingClient: ClientProxy,
        private config: ConfigService,
        ){}
    
      async create(avDto: any) {
    
        return await firstValueFrom(
          this.housingClient.send(
            {role:'availability', cmd: 'create' },
            avDto
          )
          .pipe(
            catchError((err) => {
              throw new HttpException(err,err.status);
            }),
          )
        );
      }
    
      async findAll() {
        console.log('findall')
        return await firstValueFrom(
          this.housingClient.send(
            {role:'availability', cmd: 'findall' },{}
          )
          .pipe(
            catchError((err) => {
              throw new HttpException(err,err.status);
            }),
          )
        );
      }
    
      async findAllAvsByHousingId(dto:any) {

        return await firstValueFrom(
          this.housingClient.send(
            {role:'availability', cmd: 'findall' },dto
          )
          .pipe(
            catchError((err) => {
              throw new HttpException(err,err.status);
            }),
          )
        );
      }    
    
      async findOne(id: string) {
        return await firstValueFrom(
          this.housingClient.send(
            {role:'availability', cmd: 'findone' },{_id:id}
          )
          .pipe(
            catchError((err) => {
              throw new HttpException(err,err.status);
            }),
          )
        );
      }
    
      update(dto:any) {
        return firstValueFrom(
          this.housingClient.send(
            {role:'availability', cmd: 'updateone' },dto
          )
          .pipe(
            catchError((err) => {
              throw new HttpException(err,err.status);
            }),
          )
        );
      }

      remove(id: number) {
        return `This action removes a #${id} housing`;
      }
}
