const { productObject } = require("../helpers/joiObjects");
const Product = require( '../models/products' );
const moment = require( 'moment' );
const User = require( '../models/users' );



const createProduct = ( req, res ) => {

    const product = req.body;
    
    const validation = productObject.validate( product );

    if ( validation.error ) return res.status( 422 ).send( { message:validation.error } );

    const createdAt = moment().unix();

    const lastUpdate = moment().unix();

    const userID = res.locals.userID;

    const productFillOut = { ...product, createdAt, userID, lastUpdate };

    const newProduct = new Product( productFillOut );

    newProduct.save( ( err, productStored ) => {

        if ( err ) throw err;

        if ( !productStored ) return res.status( 500 ).send( { message:'Error from server to save the product' } );

        const productID = productStored._id;

        const filter = { _id:userID };

        const update = { $push:{ products:productID } };

        User.updateOne( filter, update, ( err, updated ) => {

            if ( err ) throw err;

            if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

            res.status( 201 ).send({ message:'Product stored successfully', newProduct:{ ...productFillOut, _id:productStored._id } });

        } );

    } );

};

const updateProduct = ( req, res ) => {

    const { data:updateProduct, productID } = req.body;

    const validation = productObject.validate( updateProduct );

    if ( validation.error ) return res.status( 422 ).send( { message:validation.error } );
    
    const userID = res.locals.userID;

    const filter = { _id:productID, userID };

    const lastUpdate = moment().unix();

    const update = { ...updateProduct, lastUpdate };

    Product.updateOne( filter, update, ( err, updated ) => {

        if ( err ) throw err;

        if ( !updated ) return res.status( 404 ).send( { message:"The user isn't exist" } );

        res.status( 200 ).send( { message:'Product updated successfully', newInfoProduct:update  } );


    } );

};

const deleteProduct = ( req, res ) => {

    const { productid:productID } = req.headers;

    if ( !productID ) return res.status( 404 ).send( { message:"The product ID is empty" } );

    const userID = res.locals.userID;

    const filter = { _id:productID, userID };

    Product.deleteOne( filter, ( err, deleted ) => {

        if ( err ) throw err;

        if ( !deleted ) return res.status( 404 ).send( { message:"The product isn't exist" } );

        const secondFilter = { _id:userID };

        const update = { $pull:{ products:productID }  };

        User.updateOne( secondFilter, update, ( err, updated ) => {

            if ( err ) throw err;

            if ( !updated ) return res.status( 404 ).send( { message:"The user doesn't exist" } );

            res.status( 200 ).send( { message:'Product was deleted successfully' } );

        } );

    } );


};

const getProductsByQuery = ( req, res ) => {

    const { query, userid:userID } = req.headers;

    if ( !query || !userID ) return res.status( 404 ).send( { mesage:'The data provided are empty' } );

    const queryPattern = new RegExp( '^'+query );

    const regex =  { $regex:queryPattern, $options:[ 'i'] }

    const filter = { $or:[ { title:regex }, { category:regex } ], userID };

    Product.find( filter, ( err, productsStored ) => {

        if ( err ) throw err;
        
        if ( productsStored.length === 0 ) return res.status( 404 ).send( { message:"Your search didn't match with any products" } );

        res.status( 200 ).send( { message:'Products found', products:productsStored } ); 

    } ).limit( 10 );
    

};

const getProductByID = ( req, res ) => {

    const { productid:productID, userid:userID } = req.headers;

    if ( !productID || !userID ) return res.status( 404 ).send( { message:'The data provided are empty' } );

    const filter = { _id:productID, userID };

    Product.findOne( filter, ( err, productStored ) => {

        if ( err ) throw err;

        if ( !productStored ) return res.status( 404 ).send( { message:"The product doesn't exist" } );

        res.status( 200 ).send({ message:'Product found!', product:productStored });

    } ).populate( { path:'userID', populate:{ path:'products' }, select:'-email -password' } );
    
};

module.exports = { createProduct, updateProduct, deleteProduct, getProductsByQuery, getProductByID };