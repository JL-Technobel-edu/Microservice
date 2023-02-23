export interface Iuser extends IauthUser {
  address: string;
  birthdate: string;
  password: string;
}

export interface IauthUser {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  roles: Role[];
}

export enum Role {
  User = 'user',
  Admin = 'admin',
}



