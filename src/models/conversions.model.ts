import mongoose from "mongoose";

export interface ConversionDocument extends mongoose.Document {
    name:string;
    device: string;
    quantity: string;
    timeOfConversion: { type: Date, default: Date },
    product:{
        sellerid: { type: mongoose.Schema.Types.ObjectId },
        productId: { type: String },
        name: { type: String },
        price:{ type: Number, min: 0, max: 65999999 },
        image:{ type: String },
        country:{ type: String }
    };
    createdAt:Date;
    updatedAt:Date;
}
export interface ConversionInput {
    name: string;
    device: string;
    product: any;
    quantity: number;
  }

  const conversionSchema =new mongoose.Schema({
    name:{ type:String,required:true,unique:true},
    device:{ type:String,required:true},
    timeOfConversion:{ type:Date},
    product:{
        sellerid: { type: mongoose.Schema.Types.ObjectId },
        productId: { type: String },
        name: { type: String },
        price:{ type: Number, min: 0, max: 65999999 },
        image:{ type: String },
        country:{ type: String }
    }
    },{
        timestamps:true
    })
    const ConversionModel = mongoose.model<ConversionDocument>("conversion",conversionSchema);
    
    export default ConversionModel;