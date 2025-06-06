import { Date, model, Schema, Types } from "mongoose";

export interface IOrders extends Document{
    id:Types.ObjectId;
    createDate:Date;
    userCreate:Types.ObjectId
    entire:number;
    subtotal:number;
    status:boolean;
    updateDate:Date;
}

const ordersSchema = new Schema<IOrders>({
  createDate:{
    Type:Date,
    default:Date.now
  },
   updateDate:{
    Type:Date,
    default:Date.now
  }, 
  entire:{
    Type:Number,
    required:true
  },
  subtotal:{
    Type:Number,
    required:true    
  },
  status:{
    type:Boolean,
    default:true,   

  }
});

export const Orders = model<IOrders>('Order',ordersSchema);