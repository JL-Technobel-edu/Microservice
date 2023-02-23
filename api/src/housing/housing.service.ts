import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom, catchError } from 'rxjs';
import { CreateHousingDto } from './dto/create-housing.dto';
import { UpdateHousingDto } from './dto/update-housing.dto';

@Injectable()
export class HousingService {
  constructor(
    @Inject('USER_CLIENT') private userClient: ClientProxy,
    @Inject('AUTH_CLIENT') private authClient: ClientProxy,
    @Inject('MAILER_CLIENT') private mailerClient: ClientProxy,
    @Inject('TOUR_CLIENT') private tourClient: ClientProxy,
    @Inject('HOUSING_CLIENT') private housingClient: ClientProxy,
    private config: ConfigService,
    ){}

  async create(userId:string,createHousingDto: CreateHousingDto) {

    return await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'create' },
        {userId:userId, prop : createHousingDto}
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    // return 'This action adds a new tour';
  }
  async isAvailable(dto:any) {

    return await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'check' },
        dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    // return 'This action adds a new tour';
  }
  async findAll(dto:any) {

    return await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'findall' },dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }

  async info(dto:any) {

    return await firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'info' },dto
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
        {role:'housing', cmd: 'findone' },{_id:id}
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
        {role:'housing', cmd: 'updateone' },dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
  }
  fileUpload(dto:any) {
    dto.picture = dto.files.map(element => {
      return {url:`/housing/files/${dto.id}/${element.filename}`,description:element.originalname}

    })
    delete dto.files;
    return firstValueFrom(
      this.housingClient.send(
        {role:'housing', cmd: 'pushone' },dto
      )
      .pipe(
        catchError((err) => {
          throw new HttpException(err,err.status);
        }),
      )
    );
    // return firstValueFrom(
    //   this.housingClient.send(
    //     {role:'housing', cmd: 'updateone' },dto
    //   )
    //   .pipe(
    //     catchError((err) => {
    //       throw new HttpException(err,err.status);
    //     }),
    //   )
    // );
  }
  remove(id: number) {
    return `This action removes a #${id} housing`;
  }
}
