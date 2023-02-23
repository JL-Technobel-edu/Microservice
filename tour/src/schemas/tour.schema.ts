import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId, ObjectID } from 'bson';
import { HydratedDocument } from 'mongoose';
import { DateRange, DateRangeSchema } from './date-range.schema';
import { Housing, HousingSchema } from './housing.schema';

export type TourDocument = HydratedDocument<Tour>;
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
export class Tour {

  @Prop({ required: true })
  userId: ObjectId;

  @Prop({ required: false, default:null })
  deletedAt: Date;

  @Prop({ required: true})
  price: number;

  @Prop({ required: false})
  phoneNumber: string;


  @Prop({ required: false })
  remark: string;


  @Prop({ required: true })
  housingId: ObjectId;



  @Prop({ required: true})
  from: Date;

  @Prop({ required: true})
  to: Date;
  
  @Prop({ required: true})
  participant: number;


  @Prop({ required: true})
  total: number;


}

export const TourSchema = SchemaFactory.createForClass(Tour);
