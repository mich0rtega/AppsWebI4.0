import { model, Schema, Types, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  id: Types.ObjectId;
  username: string;
  password: string;
  email: string;
  roles: Types.ObjectId[]; 
  status: boolean;
  phone: string;
  createDate: Date;
  deleteDate: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  roles: [{
    type: Schema.Types.ObjectId,
    ref: 'Rol',
    required: true
  }],
  status: {
    type: Boolean,
    default: true,
  },
  phone: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  deleteDate: {
    type: Date,
    default: Date.now,
  },
});

export const User = model<IUser>('User', userSchema, 'user');
