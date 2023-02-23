import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import { HydratedDocument } from 'mongoose';

export type AuthTokenDocument = HydratedDocument<AuthToken>;
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
export class AuthToken {
  @Prop({ required: true, unique: true })
  userId: ObjectID;

  @Prop({ required: false ,default:null})
  refreshToken: string;


  @Prop({ required: false, default:null })
  deletedAt: Date;


  
}

export const AuthTokenSchema = SchemaFactory.createForClass(AuthToken);
