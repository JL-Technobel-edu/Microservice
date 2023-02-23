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
export class HousingService {
  
  constructor(
    @InjectModel(Housing.name) private housingModel: Model<HousingDocument>,
    @InjectModel(Availability.name) private avModel: Model<AvailabilityDocument>,
    private config: ConfigService,
  ) {}




  async create(dto:any) {
    const t = {ownerId : new BSON.ObjectId(dto.userId), ...dto.prop}
    const housingModel = new this.housingModel(t);
    return await housingModel.save();
  }



  async check(dto:any) {
    const housing = 
    this.housingModel.aggregate(dto);
    
    return   housing;   
  }

  async findOne(dto:any) {
    console.log('ok')
    console.log(dto)
    const housing = (await this.housingModel.findOne(
      dto      
    )).populate('availability');
    if(!housing)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing  Not found`,
      name: 'NotFoundException',
    })

    return   housing;   
  }

  async findAll(dto:any) {
    const housing = 
    this.housingModel.aggregate(dto);
    return   housing;   
  }



  async updateOne(dto:any) {
    const filter = {_id:new BSON.ObjectId(dto.id),ownerId: new BSON.ObjectId(dto.userId)}
    const housing = (await this.housingModel.findOne(filter));
   

    if(!housing)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing Not found`,
      name: 'NotFoundException',
    })
    Object.entries(dto).forEach(([key, val]) => {
      housing[key] = val;
    });
    housing.save();
    return   housing;   
  }

  async pushOne(dto:any) {
    const filter = {_id:new BSON.ObjectId(dto.id),ownerId: new BSON.ObjectId(dto.userId)}
    const housing = (await this.housingModel.findOne(filter));
  

    if(!housing)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Housing Not found`,
      name: 'NotFoundException',
    })
    Object.entries(dto).forEach(([key, val]) => {
      if(val instanceof Array)
      Object.entries(val).forEach(([k, v]) => {
        housing[key].push(v);
      });
    });
    housing.save();
    return   housing;   


  }




  findAllRangeDate(dto:any){

    let match:any[]=[{
      '$expr': {
        '$eq': [
          '$housingId', '$$hid'
        ]
      }
    }];


    if(Object.keys(dto).length > 0)
    {
      if(dto.from && dto.to)
      {


        match.push({
          '$expr': {
            '$gte': [
              '$period',{'$toDate':dto.from }
            ]
          }
        })
        match.push({
          '$expr': {
            '$lte': [
              '$period', {'$toDate':dto.to }
            ]
          }
        })
      }
      if(dto.price)
      {
        match.push({
          '$expr': {
            '$lte': [
              '$price', +dto.price
            ]
          }
        }) 

      }
      if(dto.capacity)
      {
        match.push({
          '$expr': {
            '$gte': [
              '$capacity', +dto.capacity
            ]
          }
        }) 
        match.push({
          '$expr': {
            '$gte': [
              '$reserved', +dto.capacity
            ]
          }
        }) 
      }    

    };

    const query = 
    [
      {
        '$lookup': {
          'let': {
            'hid': {
              '$toObjectId': '$_id'
            }
          }, 
          'from': 'availabilities', 
          'pipeline': [
            {
              '$match': {
                '$and': match
              }
            }
          ], 
          'as': 'avs'
        }
      }, 
      {
        '$match':{
          'avs.0':{$exists:true}
        }
      },            
      {
        '$addFields': {
          'id': '$_id'
        }
      }
    ]

    return  query
  }
}
