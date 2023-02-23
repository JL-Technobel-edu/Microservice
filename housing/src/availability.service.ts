import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as BSON from 'bson';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Housing, HousingDocument } from './schemas/housing.schema';
import { Availability, AvailabilityDocument } from './schemas/availability.schema';
import  * as moment from 'moment';

@Injectable()
export class AvailabilityService {
  
  constructor(
    @InjectModel(Housing.name) private housingModel: Model<HousingDocument>,
    @InjectModel(Availability.name) private avModel: Model<AvailabilityDocument>,
    private config: ConfigService,
  ) {}




  async create(dto:any) {
    
    //No need to input date in specific format with moment
let from = moment(dto.daterange[0]);
let to   = moment(dto.daterange[1]);


let bulkData = [];

while (moment(from).isBefore(to)) {
bulkData.push({housingId:dto.id,period:from,price:dto.price,capacity:dto.capacity,reserved:dto.capacity});

  from = moment(from).add(1,'days'); 
}
console.log(bulkData);
//const avs = this.avModel.find({housingId : dto.id,})
 (await this.avModel.bulkWrite(bulkData.map(item => ({insertOne:{document:item}}) )));

 return   bulkData;
  }

  async check(dto:any) {
    const avs = (await this.avModel.find(
     {housingId : dto.housingId,
        '$gte': [
          '$period', dto.from
        ]}      
    ));
    if(!avs)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing  Not found`,
      name: 'NotFoundException',
    })

    return   avs;   
  }



  async findOne(dto:any) {
    const avalaibility = (await this.avModel.findOne(
      dto      
    ));
    if(!avalaibility)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing  Not found`,
      name: 'NotFoundException',
    })
    return   avalaibility;   
  }

  async findAll(dto:any) {
    const avalaibility = (await this.avModel.find(dto));
    return   avalaibility;   
  }


  async updateOne(dto:any) {
    const filter = {_id:new BSON.ObjectId(dto.id),houseId: new BSON.ObjectId(dto.userId)}
    const avalaibility = (await this.avModel.findOne(filter));
   

    if(!avalaibility)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing Not found`,
      name: 'NotFoundException',
    })
    Object.entries(dto).forEach(([key, val]) => {
        avalaibility[key] = val;
    });
    avalaibility.save();
    return   avalaibility;   
  }

  async pushOne(dto:any) {
    const filter = {_id:new BSON.ObjectId(dto.id),housingId: new BSON.ObjectId(dto.userId)}
    const avalaibility = (await this.avModel.findOne(filter));
  

    if(!avalaibility)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing Not found`,
      name: 'NotFoundException',
    })
    Object.entries(dto).forEach(([key, val]) => {
      if(val instanceof Array)
      Object.entries(val).forEach(([k, v]) => {
        avalaibility[key].push(v);
      });
    });
    avalaibility.save();
    return   avalaibility;   


  }
}
