const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const UserSchema = Schema({

    businessName:{ type:String, required:true },
    username:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    createdAt:{ type:Number, required:true },
    email:{ type:String, required:true, unique:true },
    profilePhoto:{ type:String, required:false },
    banner:{ type:String, required:false },
    mainPresentationOne:{ type:String, required:false },
    mainPresentationTwo:{ type:String, required:false },
    footerTitle:{ type:String, required:false },
    footerSectionOne:{ type:String, required:false },
    footerSectionTwo:{ type:String, required:false },
    footerLastLine:{ type:String, required:false },
    isOpenBusiness:{ type:Boolean, required:false, default:false },
    facebookLink:{ type:String, required:false },
    instagramLink:{ type:String, required:false },
    twitterLink:{ type:String, required:false },
    products:[ { type:mongoose.Types.ObjectId, ref:'products', default:[] } ],
    location:{ type:String, required:false },
    since:{ type:String, required:false },
    until:{ type:String, required:false },
    businessCategory:{ type:String, required:false },
    bannerSectionProductsText:{ type:String, required:false },
    bannerSectionProducts:{ type:String, required:false },
    personalWorking:{ type:Number, required:false },
    lastUpdatePersonalWorking:{ type:Number, required:false },
    clientsInTheShop:{ type:Number, required:false },
    lastUpdateClientsInTheShop:{ type:Number, required:false }


});

module.exports = mongoose.model( 'users', UserSchema );
