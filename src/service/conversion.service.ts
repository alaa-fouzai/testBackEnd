import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ConversionModel, { ConversionInput } from "../models/conversions.model";

export async function createconversion(input: ConversionInput) {
    try {
      const result = await ConversionModel.create(input);
      return result;
    } catch (e:any) {
        throw new Error(e);
    }
  }
export async function getGlobalPerformanceConversion(start:string,finish:Date) {
try {
    var match_stage = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stage = {
        $group: {_id:null,
                sum_val:{$sum:{$multiply: [ "$quantity", "$product.price" ]}}
            }
    }
    var pipeline = [ match_stage, group_stage ]
    var chiffre = await ConversionModel.aggregate(pipeline)
    /**************sales */
    var match_stageSale = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stageSale = {
        $group: {_id:null, sum_val:{ $sum: "$quantity"}}
    }
    var pipeline2 = [ match_stageSale, group_stageSale ]
    var salesNumber = await ConversionModel.aggregate(pipeline2)

    /************************average cart */
    var match_stagecart = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stagecart = {
        $group: {_id:null, avg_val:{$avg:{$multiply: [ "$quantity", "$product.price" ] }}}
    }
    var pipeline3 = [ match_stagecart, group_stagecart ]
    var averageCart = await ConversionModel.aggregate(pipeline3)

    /************************** countryNumber */
    var match_stagecountry = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stageccount = {
        $group: {_id:null, c:{$sum :"$product.country"},avg_val: {  $sum: 1  }}
    }
    var pipeline4 = [ match_stagecountry, group_stageccount ]
    var countryNumber = await (await ConversionModel.distinct("product.country",{"createdAt":{$gte:new Date(start),$lt:new Date(finish)}})).length
    /***************************ProductSoldNumber */
    var match_stagesold = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stagesold = {
        $group: {_id:null, sum_val:{$sum:"$quantity"}}
    }
    var pipeline5 = [ match_stagesold, group_stagesold ]
    var ProductSoldNumber = await ConversionModel.aggregate(pipeline5)

    //const salesNumber = await ConversionModel.aggregate([{$group: {_id:null, sum_val:{$sum:"$quantity"}}}]);
    //const averageCart = await ConversionModel.aggregate([{$group: {_id:null, avg_val:{$avg:{$multiply: [ "$quantity", "$product.price" ] }}}}]);
    //const countryNumber = await ConversionModel.distinct("product.country");
    //const ProductSoldNumber = await ConversionModel.aggregate([{$group: {_id:null, sum_val:{$sum:"$quantity"}}}]);
    const modal = {
        "totalSales":chiffre[0]["sum_val"],
        "Sales":salesNumber[0]["sum_val"],
        "AverageCart":averageCart[0]["avg_val"],
        "CountryNumber":countryNumber,
        "ProductSoldNumber":ProductSoldNumber[0]["sum_val"]
    }
    return modal;
} catch (e:any) {
    throw new Error(e);
}
}