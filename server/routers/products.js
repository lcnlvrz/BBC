const express = require( 'express' );
const ProductController = require( '../controllers/products' );
const UserMiddleware = require( '../middlewares/users' );
const app = express.Router();

app.post( '/product', [ UserMiddleware.validateToken ], ProductController.createProduct );

app.put( '/update-product', [ UserMiddleware.validateToken ], ProductController.updateProduct );

app.delete( '/delete-product', [ UserMiddleware.validateToken ], ProductController.deleteProduct );

app.get( '/one-product', ProductController.getProductsByQuery );

app.get( '/product-by-id', ProductController.getProductByID );

module.exports = app;