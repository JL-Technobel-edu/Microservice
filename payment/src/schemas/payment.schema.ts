import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import { HydratedDocument } from 'mongoose';
import {  IAddress, IAvailable, IPhoto } from 'src/interfaces';

export type PaymentDocument = HydratedDocument<Payment>;
function transformValue(doc:any, ret: {[key: string]: any}) {
  delete ret._id;
  //delete ret.password;
}


@Schema({ timestamps: true,versionKey:false,
  toObject: {
    virtuals: true,
    versionKey: false,
    transform: transformValue
  },
  toJSON: {
    virtuals: true,
    versionKey: false,
    transform: transformValue
  } })
export class Payment {

  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, default:null })
  deletedAt: Date;

  @Prop({ required: false})
  picture: IPhoto[];

  @Prop({ required: false})
  availability: IAvailable;

  @Prop({ required: false})
  participant: number;

  @Prop({ required: false})
  cover: IPhoto;

  @Prop({ required: true})
  address: IAddress;

  @Prop({ required: false})
  price: number;

  @Prop({ required: false})
  phoneNumber: string;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
