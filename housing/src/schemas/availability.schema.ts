import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import mongoose, { HydratedDocument, syncIndexes } from 'mongoose';
import {  IAddress, IAvailable, IOccupy, IPhoto, IRange } from 'src/interfaces';
export type AvailabilityDocument = HydratedDocument<Availability>;
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
  },})
export class Availability {



  @Prop({ required: true , type: mongoose.Schema.Types.ObjectId, ref: 'Housing'})
  housingId: ObjectId;
  
  @Prop({ required: true })
  period: Date;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  capacity:number;

  @Prop({ required: true })
  reserved:number;
}

export const AvailabilitySchema = SchemaFactory.createForClass(Availability);
AvailabilitySchema.index({
  housingId: 1,
  period: 1,
}, {
  unique: true,
});