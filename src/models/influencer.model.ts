import mongoose from "mongoose";

import bcrypt from 'bcrypt';

import config from 'config';

export interface InfluencerDocument extends mongoose.Document {
    email:string;
    name: string;
    device: string;
    password:string;
    createdAt:Date;
    updatedAt:Date;
    comparePassword(candidatePassword: string): Promise<Boolean>;
}
export interface InfluencerInput {
    email: string;
    name: string;
    password: string;
  }

const influencersSchema =new mongoose.Schema({
    email:{ type:String,required:true,unique:true},
    name:{ type:String,required:true},
    device:{ type:String,required:true},
    password:{ type:String,required:true}
    },{
        timestamps:true
    })

    influencersSchema.pre("save", async function (next) {
        const Influencer = this as InfluencerDocument;
      
        if (!Influencer.isModified("password")) {
          return next();
        }
      
        const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
      
        const hash = await bcrypt.hashSync(Influencer.password, salt);
      
        Influencer.password = hash;
      
        return next();
      });
    
    influencersSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
        const Influencer = this as InfluencerDocument;
      
        return bcrypt.compare(candidatePassword, Influencer.password).catch((e) => false);
      };
    
    const InfulencerModel = mongoose.model<InfluencerDocument>("influencer",influencersSchema);
    
    export default InfulencerModel;