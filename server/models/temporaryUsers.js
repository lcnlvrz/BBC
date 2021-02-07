const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const TemporaryUserSchema = Schema({

    email:{ type:String, required:true, unique:true },
    otp:{ type:Number, required:true },
    createdAt:{ type:Number, required:true }

});

module.exports = mongoose.model( 'temporaryUsers', TemporaryUserSchema );