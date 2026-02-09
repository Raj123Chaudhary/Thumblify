import mongoose from "mongoose"

export interface IUser extends Document{
     name: string;
     email:string;
     password:string;
     createdAt?:Date;
     updatedAt?:Date;
}

const userSchema = new mongoose.Schema<IUser>({
     name :{type:String,required:true,trim:true,minLength:2,maxLength:20},
     email:{type:String,required:true,trim:true,unique:true,lowercase:true},
     password:{type:String,required:true,trim:true,select:false}
},{timestamps:true})

export default mongoose.model<IUser>("User",userSchema)