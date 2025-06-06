import {  model, Schema, Types } from "mongoose";

export interface IUser extends Document{
 name:string;
 id:Types.ObjectId;
 username: string;
 password:string;
 email:string;
 role:string;
 status:boolean;
 phone:String;
 createDate:Date;
 deleteDate:Date;
}
const userSchema= new Schema<IUser>({
  name:{
    type:String,
    require:true,

  },
  username:{
    type:String,
    require:true,
    unique:true,
  },
  email:{
    type:String,
    require:true,
    unique:true,
  },
  password:{
    type:String,
    require:true,
    unique:true,

  },
  role:{
    type:String,
    require:true,
    unique:true,
  },
  status:{
    type:Boolean,
    default:true,   

  },
  phone:{
    type:String,
    require:true,    
  },
 
  createDate:{
    type: Date,
    default:Date.now
  },
  deleteDate:{
    type: Date,
    default:Date.now
  },
});

export const User = model<IUser>('User',userSchema,'user')