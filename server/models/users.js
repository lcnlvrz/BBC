const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const UserSchema = Schema({

    businessName:{ type:String, required:true },
    username:{ type:String, required:true, unique:true },
    password:{ type:String, required:true },
    createdAt:{ type:Number, required:true },
    email:{ type:String, required:true, unique:true },
    profilePhoto:{ type:String, required:false }

});

module.exports = mongoose.model( 'users', UserSchema );
