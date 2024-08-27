import { ObjectId } from "mongoose";


export interface Checkuser extends Document {
  email: string;
  password: string;
}

export interface Confirmuser extends Document {
  email: string;
}

export interface tockens {
  accessToken: string;
  refreshToken:string;
}



export interface IUser extends Document {
  id:ObjectId;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  isVerified?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  otp?: number;
}


export interface IUserReturn extends Document {
  id:ObjectId;
  name: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  otp?: number;
}




