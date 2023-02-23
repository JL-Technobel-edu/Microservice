import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectID } from 'bson';
import mongoose, { HydratedDocument } from 'mongoose';
import { CodeStatus, IAddress, Role } from 'src/interfaces';

export type UserDocument = HydratedDocument<User>;
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
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true ,default: [Role.User]})
  roles: string[];

  @Prop({ required: false })
  firstname: string;

  @Prop({ required: false })
  lastname: string;

  @Prop({ required: false, default:null })
  deletedAt: Date;

  @Prop({ required: false, default:null })
  isActive: boolean;

  @Prop({ required: false, default:CodeStatus.EMAIL })
  codeStatus: CodeStatus;

  @Prop({ required: false ,default:null})
  refreshToken: string;

  @Prop({ required: false})
  activationToken: string;

  @Prop({ required: false})
  address: IAddress;
 
}

export const UserSchema = SchemaFactory.createForClass(User);
