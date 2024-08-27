import mongoose, { Schema } from "mongoose";
import { IUser } from "../entities/userEntities";

const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
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
    isActive: {
      type: Boolean,
      required: true,
    },
    isAdmin:{
        type:Boolean,
        required:false 
    },
  
  },
  {
    timestamps: true,
  }
);


const UserSchemadata = mongoose.model<IUser>("userdetail", UserSchema);

export default UserSchemadata;
