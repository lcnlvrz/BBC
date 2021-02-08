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
    twitterLink:{ type:String, required:false }



});

module.exports = mongoose.model( 'users', UserSchema );
