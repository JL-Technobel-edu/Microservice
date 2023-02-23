import { ObjectID } from 'bson';
import { IsEmail, IsEnum, IsMongoId, IsNotEmpty, IsString } from 'class-validator';


export class SignupDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsMongoId()
  @IsNotEmpty()
  _id: ObjectID;

}
