import { Date, model, Schema, Types } from "mongoose";
import { Orders } from "./Orders";

export interface IRol extends Document{
    id:Types.ObjectId;
    type:String;
    name:String;
    createDate:Date;
    status:boolean;
    updateDate:Date;
}

const rolSchema = new Schema<IRol>({
    createDate:{
     type:Date,
     default:Date.now
    },
    updateDate:{
     type:Date,
     default:Date.now
    }, 
    status:{
     type:Boolean,
     default:true, 
    },
    name:{
        type:String,
        required:true,
    },
    type:{
      type:String,
      required:true,
    }
});

export const Rol = model<IRol>('Rol',rolSchema);