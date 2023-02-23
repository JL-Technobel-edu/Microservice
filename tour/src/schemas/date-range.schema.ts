import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import { HydratedDocument } from 'mongoose';
import {   IAvailable, IRangeDate } from 'src/interfaces';

export type DateRangeDocument = HydratedDocument<DateRange>;
function transformValue(doc:any, ret: {[key: string]: any}) {
  delete ret._id;
  //delete ret.password;
}


@Schema({_id:false, timestamps: false,versionKey:false,
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
export class DateRange {



  @Prop({ required: true })
  from: Date;

  @Prop({ required: true })
  to: Date;

}

export const DateRangeSchema = SchemaFactory.createForClass(DateRange);
