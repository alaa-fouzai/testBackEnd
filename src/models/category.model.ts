import mongoose from "mongoose";

export interface CategoryDocument extends mongoose.Document {
    categoryName:string;
    id:{ type: String };
    productId: string;
    createdAt:Date;
    updatedAt:Date;
}
export interface CategoryInput {
    categoryName: string;
    productId: string;
  }

  const categorySchema =new mongoose.Schema({
    id:{ type: String },
    categoryName:{ type:String,required:true,unique: false},
    productId:{ type:String,required:true},
    },{
        timestamps:true
    })
    const CategoryModel = mongoose.model<CategoryDocument>("category",categorySchema);
    
    export default CategoryModel;