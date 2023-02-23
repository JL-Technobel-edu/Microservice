import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as BSON from 'bson';
import { RpcException } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private config: ConfigService,

  ) {}




  async create(dto:any) {

      const userModel = new this.userModel(dto);
      return await userModel.save();

  }

  async findOne(dto:any) {

      const user = (await this.userModel.findOne(
        dto      
      ));
      if(!user)
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        message: `User ${dto.email} Not found`,
        name: 'NotFoundException',
      })

      return   user;   
 
  
  }

  async updateOne(userId:string,prop:any) {
    const user = (await this.userModel.findOneAndUpdate(
      {_id: new BSON.ObjectId(userId)}      
    ,prop,{new:true}));


    if(!user)
    throw new RpcException({
      status: HttpStatus.NOT_FOUND,
      message: `User Not found`,
      name: 'NotFoundException',
    })
    return   user;   


}
}
