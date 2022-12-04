import { FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import CategoryModel, { CategoryInput } from "../models/category.model";
import ColorModel from "../models/color.model";
import ConversionModel from "../models/conversions.model";
import InfulencerModel from "../models/influencer.model";

export async function addCategory(input: CategoryInput) {
    try {
      const result = await CategoryModel.create(input);
      return result;
    } catch (e:any) {
        throw new Error(e);
    }
  }

export async function getinsight(start:string,finish:Date) {
  try {
    /*****************best device */
    var match_stage = {
        $match: { 
            "createdAt":{$gte:new Date(start),$lt:new Date(finish)}
        }
    }
    var group_stage = {
        $group: {_id:"$device",
                  count : {$sum : 1},
            }
    }
    
    var pipeline = [ match_stage, group_stage ]
    var device = await ConversionModel.aggregate(pipeline)
    var max = 0;
    var dev = "";
    device.forEach(function (value:any) {
      if (value.count >max ) {
        max=value.count;
        dev=value._id;
      }
  });
/********************meilleur category */
var group_stage = {
  $group: {_id:"$categoryName",
            count : {$sum : 1},
      }
}

var pipeline1 = [ match_stage, group_stage ]
var popularCat = await CategoryModel.aggregate(pipeline1)
var maxcat = 0;
var cat = "";
popularCat.forEach(function (value:any) {
if (value.count >maxcat ) {
  maxcat=value.count;
  cat=value._id;
}
});
/****************************meilleur moment */
var group_stage = {
  $group: {_id:"$createdAt",
            count : {$sum : 1},
      }
}

var pipeline2 = [ match_stage, group_stage ]
var popularmoment = await ConversionModel.aggregate(pipeline2)
var maxmoment = 0;
var mom = "";
popularmoment.forEach(function (value:any) {
if (value.count >maxmoment ) {
  maxmoment=value.count;
  mom=value._id;
}
});
/****************************meilleur couleur */
var group_stage = {
  $group: {_id:"$ColorName",
            count : {$sum : 1},
      }
}

var pipeline3 = [ match_stage, group_stage ]
var popularcolor = await ColorModel.aggregate(pipeline3)
var maxcolor = 0;
var col = "";
popularcolor.forEach(function (value:any) {
if (value.count >maxcolor ) {
  maxcolor=value.count;
  col=value._id;
}
});
/****************************meilleur pays vente */
var group_stage = {
  $group: {_id:"$product.country",
            count : {$sum : 1},
      }
}

var pipeline4 = [ match_stage, group_stage ]
var popularcountry = await ConversionModel.aggregate(pipeline4)
var maxcountry = 0;
var ctr = "";
popularcountry.forEach(function (value:any) {
if (value.count >maxcountry ) {
  maxcountry=value.count;
  ctr=value._id;
}
});
/****************************meilleur seller */
var group_stage2 = {
  $group: {_id:"$product.sellerid",
            count : {$sum : 1},
      }
}

var pipeline5 = [ match_stage, group_stage2 ]
var popularseller = await ConversionModel.aggregate(pipeline5)
var maxsales = 0;
var seller = "";
popularseller.forEach(function (value:any) {
if (value.count >maxsales ) {
  maxsales=value.count;
  seller=value._id;
}
});
console.log(seller);
const inf = await InfulencerModel.find({_id: seller});
console.log(inf);

    const modal = {
        "totalSales":{"device":dev,"number":max},
        "popularCategory":{"popularCat":cat,"number":maxcat},
        "popularMoment":{"popularMoment":mom,"number":maxmoment},
        "popularcolor":{"popularColor":col,"number":maxcolor},
        "popularcountry":{"popularCountry":ctr,"number":maxcountry},
        "popularinfluencer":inf,
    }
    return modal;
} catch (e:any) {
    throw new Error(e);
}
}