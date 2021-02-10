const mongoose = require( 'mongoose' );

const Schema = mongoose.Schema;

const ProductSchema = Schema({

    image:{ type:String, required:true },
    title:{ type:String, required:true },
    subtitle:{ type:String, required:true },
    price:{ type:Number, required:true },
    currency:{ type:String, required:true },
    description:{ type:String, required:true },
    details:{ type:String, required:true },
    category:{ type:String, required:true },
    stock:{ type:Number, required:true },
    createdAt:{ type:Number, required:true },
    userID:{ type:mongoose.Types.ObjectId, required:true, ref:'users' },
    lastUpdate:{ type:Number, required:true }
});

module.exports = mongoose.model( 'products', ProductSchema );