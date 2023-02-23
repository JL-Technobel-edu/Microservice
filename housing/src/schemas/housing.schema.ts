import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import mongoose, { HydratedDocument } from 'mongoose';
import {  IAddress, IAvailable, IOccupy, IPhoto } from 'src/interfaces';
import { Availability } from './availability.schema';

export type HousingDocument = HydratedDocument<Housing>;
function transformValue(doc:any, ret: {[key: string]: any}) {
  //ret.id = ret._id;
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

  @Prop({ required: true ,  type: mongoose.Schema.Types.ObjectId, ref: 'User'  })
  ownerId: ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;

  @Prop({ required: false, default:null })
  deletedAt: Date;

  @Prop({ required: false})
  picture: IPhoto[];

  // @Prop({ required: false})
  // availability: IAvailable[];

  // @Prop({ required: false})
  // participant: number;

  @Prop({ required: false, default:false})
  isPublished: boolean;

  @Prop({ required: false, default:false})
  isOrdered: boolean;

  @Prop({ required: false})
  address: IAddress;

  // @Prop({ required: false})
  // occupied: IOccupy[];

  // @Prop({ required: false})
  // price: number;


  @Prop({ required: false})
  phoneNumber: string;
}

export const HousingSchema = SchemaFactory.createForClass(Housing);
// Virtual populate
HousingSchema.virtual('availability', {
  ref: 'Availability',
  foreignField: 'housingId',
  localField: '_id',
});


HousingSchema.virtual('user', {
  ref: 'User',
  foreignField: '_id',
  localField: 'ownerId',
});