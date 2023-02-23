import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import { HydratedDocument } from 'mongoose';
import {   IAvailable, IRangeDate } from 'src/interfaces';
import { DateRange, DateRangeSchema } from './date-range.schema';

export type HousingDocument = HydratedDocument<Housing>;
function transformValue(doc:any, ret: {[key: string]: any}) {
  //delete ret._id;
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
export class Housing {
 


  @Prop({ required: true })
  housingId: ObjectId;



  @Prop({ required: true,type:DateRangeSchema})
  availability: DateRange;
  
  @Prop({ required: true})
  participant: number;

  @Prop({ required: true,default:0})
  price: number;

  @Prop({ required: true,default:0})
  total: number;

  @Prop({ required: true,default:0})
  duration: number;
}

export const HousingSchema = SchemaFactory.createForClass(Housing);
