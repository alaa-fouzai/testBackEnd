import mongoose from "mongoose";

export interface ColorDocument extends mongoose.Document {
    ColorName:string;
    id:{ type: String },
    productId: { type: mongoose.Schema.Types.ObjectId },
    createdAt:Date;
    updatedAt:Date;
}
export interface ColorInput {
    ColorName: string;
    productId: string;
  }

  const colorSchema =new mongoose.Schema({
    id:{ type: String },
    ColorName:{ type:String,required:true,unique: false},
    productId:{ type:String,required:true},
    },{
        timestamps:true
    })
    const ColorModel = mongoose.model<ColorDocument>("color",colorSchema);
    
    export default ColorModel;