export interface ICountry {
  
  name: string;
  code: string;
}

export interface IAddress {
  
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


