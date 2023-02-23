import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import * as BSON from 'bson';
import { create } from 'domain';
import { firstValueFrom, catchError } from 'rxjs';
import { CodeStatus } from 'src/shared/enums/code-status.enum';
import { CreateTourDto } from './dto/create-tour.dto';
import { UpdateTourDto } from './dto/update-tour.dto';
import { IHousing } from './interfaces/itour.interface';

@Injectable()
export class ToursService {

  constructor(
    @Inject('USER_CLIENT') private userClient: ClientProxy,
    @Inject('AUTH_CLIENT') private authClient: ClientProxy,
    @Inject('MAILER_CLIENT') private mailerClient: ClientProxy,
    @Inject('TOUR_CLIENT') private tourClient: ClientProxy,
    @Inject('HOUSING_CLIENT') private housingClient: ClientProxy,
    private config: ConfigService,
    ){}

  async create(dto: any) {
    const housing = await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'findone' },{_id:new BSON.ObjectId(dto.housingId)}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    return await firstValueFrom(
      this.tourClient.send(
        {role:'tour', cmd: 'create' },
        
        {prop:dto,housing}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    // return 'This action adds a new tour';
  }

  findAll() {
    return `This action returns all tours`;
  }

  async findOne(id: any) {
    return await firstValueFrom(
      this.tourClient.send(
        {role:'tour', cmd: 'findone' },
        {_id:id}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }
  async addHousing(dto:any) {
    const housing = await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'findone' },{_id:new BSON.ObjectId(dto.housingId)}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    
    return await firstValueFrom(
      this.tourClient.send(
        {role:'tour', cmd: 'add-housing' },
        {
          prop:dto,housing

        }
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }
  async updateHousing(dto:any) {
    console.log(dto)
    return await firstValueFrom(
      this.tourClient.send(
        {role:'tour', cmd: 'update-housing' },
      dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }

  remove(id: string) {
    return `This action removes a #${id} tour`;
  }
}
