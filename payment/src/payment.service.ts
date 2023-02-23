import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as BSON from 'bson';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment, PaymentDocument } from './schemas/payment.schema';

@Injectable()
export class PaymentService {
  
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
    private config: ConfigService,

  ) {}




  async create(dto:any) {
const t = {userId : new BSON.ObjectId(dto.userId), ...dto.prop}
console.log(dto)
      const paymentModel = new this.paymentModel(t);
      return await paymentModel.save();

  }

  async findOne(dto:any) {

      const payment = (await this.paymentModel.findOne(
        dto      
      ));
      if(!payment)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `Payment ${dto.email} Not found`,
        name: 'NotFoundException',
      })
      return   payment;   
 
  
  }

  async updateOne(paymentId:string,prop:any) {
    const payment = (await this.paymentModel.findOneAndUpdate(
      {_id: new BSON.ObjectId(paymentId)}      
    ,prop,{new:true}));


    if(!payment)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `Payment Not found`,
      name: 'NotFoundException',
    })
    return   payment;   


}
}
