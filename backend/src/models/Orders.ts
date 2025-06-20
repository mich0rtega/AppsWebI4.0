import { Document, model, Schema, Types } from "mongoose";

interface IOrderProduct {
  productId: Types.ObjectId;
  quantity: number;
  price: number;
}

export interface IOrders extends Document {
  _id: Types.ObjectId;
  user_id: string;
  createDate: Date;
  userCreate: Types.ObjectId;
  entire: number;
  subtotal: number;
  status: string;
  updateDate: Date;
  products: IOrderProduct[];
}

const orderProductSchema = new Schema<IOrderProduct>(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  { _id: false }
);

const ordersSchema = new Schema<IOrders>(
  {
    user_id: {
      type: String,
      required: true,
    },
    userCreate: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createDate: {
      type: Date,
      default: Date.now,
    },
    updateDate: {
      type: Date,
      default: Date.now,
    },
    entire: {
      type: Number,
      
      min: 0,
    },
    subtotal: {
      type: Number,
      
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled"],
    },
    products: {
      type: [orderProductSchema],
      required: true,
      validate: {
        validator: (v: IOrderProduct[]) => Array.isArray(v) && v.length > 0,
        message: "Debe contener al menos un producto",
      },
    },
  },
  
);

export const Orders = model<IOrders>("Order", ordersSchema);
