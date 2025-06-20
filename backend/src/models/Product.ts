import { Date, model, Schema, Types } from "mongoose";

export interface IProduct extends Document{
    name: string;
    price: Number;
    status:boolean;
    description:string;
    stock:Number;
}

const productSchema  = new Schema<IProduct>({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    status:{
        type:Boolean,
        required:true,
    },
    description:{
        type:String,
    },
    stock:{
        type:Number,
        required:true,
    }
});

export const Product = model<IProduct>('Product',productSchema)