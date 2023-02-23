export class IPhoto{
  
  url: string;
  description?: string;
  isCover:boolean=false;
}
export class IOccupy{
  
  range: IRange;
  capacity:number;
}

export class IAvailable{
  
  range: IRange;
  price: number;
  capacity:number;
}
export class IRange{
  
  from: Date;
  to: Date;
}
export interface ICountry {
  
  name: string;
  code: string;
}

export class IAddress {
  
  country: ICountry;
  street: string;
  zip:number;
  city:string;

}

export interface IProfile {
  firstname: string;
  lastname: string;
  address: IAddress;
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


