import { ObjectId } from "bson";
export class IRangeDate{
  
  from: Date;
  to: Date;
}
export class IAvailable{
  date: IRangeDate;
}

export interface ICountry {
  
  name: string;
  code: string;
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}


export enum CodeStatus {
  EMAIL = 'On waiting confirmation email',
  PROFILE = 'On waiting confirmation profil',
  BANNED = 'Contact Administrator',
  COMPLETED = 'Functionality available'
}





