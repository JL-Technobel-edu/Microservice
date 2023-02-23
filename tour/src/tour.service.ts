import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as BSON from 'bson';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tour, TourDocument } from './schemas/tour.schema';
import { Housing, HousingDocument } from './schemas/housing.schema';
import { of, throwError } from 'rxjs';
import { TourHousing } from './class/tour-housing';
import  * as moment from 'moment';


@Injectable()
export class TourService {
  
  constructor(
    @InjectModel(Tour.name) private tourModel: Model<TourDocument>,
    private config: ConfigService,
    @InjectModel(Housing.name) private housingModel: Model<HousingDocument>,
  ) {}




  async create(dto:any) {

      const tour = new TourHousing(dto);


      const tourModel = new this.tourModel(tour.tour);
      return await tourModel.save();

  }

  async findOne(dto:any) {

    const tour = (await this.tourModel.findOne(dto));

    if(!tour)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Tour ${dto.email} Not found`,
        name: 'NotFoundException',
      })

    return tour;

  }

  // async addHousing(dto:any) {

  //   const housing = new TourHousing(dto);
  //   if(Math.sign(housing.duration) != 1)
  //   throw new RpcException({
  //       status: HttpStatus.BAD_REQUEST,
  //       message: `Range date must be valid`,
  //       name: 'BadRequestException',
  //     })
  // return (await this.tourModel.findOneAndUpdate(
  //   {_id:new BSON.ObjectId(dto.prop.id),userId: new BSON.ObjectId(dto.prop.userId)},
  //   { 
  //     $inc:{
  //       price : (housing.total),
  //     },     
                    
  //       $push:{
  //         housing:housing.toArray() 
  //       }
  //   },
  //   { 
  //     new:true,    
  //     projection:{
  //       housing: { 
  //         $arrayElemAt: [ "$housing", -1 ]
  //       }, 
  //     }
  //   } 
  // ));
  // }

  // async updateHousing(dto:any) {
    

  //   const filter = {_id:new BSON.ObjectId(dto.id),userId: new BSON.ObjectId(dto.userId),"housing._id" : new BSON.ObjectId(dto.housingId)}


  //   const h = await this.tourModel.findOne(filter)
    
  //   if(!h)
  //   throw new RpcException({
  //     status: HttpStatus.NOT_FOUND,
  //     message: `Housing Not found`,
  //     name: 'NotFoundException',
  //   })
  //   const hy:any = h.housing.find((e:any) => 
  //     e._id == dto.housingId
      
  //   )  

  //   h.price -= hy.total;
  //   hy.availability = this.getDt(dto.availability);
  //   hy.participant = dto.participant;
  //   hy.duration = this.getDurationDiff(dto.availability.from,dto.availability.to,'asDays');
  //   hy.total = (hy.participant * hy.price) * hy.duration;
  //   h.price += hy.total;
  //   await h.save();
  //   return hy;

  // }


  getDurationDiff(from:Date,to:Date,prop:string){
    return Math.round(moment.duration(moment(to).diff(moment(from)))[prop]());
  }
  getDt(dt:any){
    return {from : new Date(dt.from), to : new Date(dt.to)};
  }
}
