import React from 'react'
import ProductCard from '../../../reusableComponents/ProductCard/ProductCard';
import PropagateLoader from "react-spinners/PropagateLoader";

const Products = ( props ) => {

    const { products, isSearching } = props;

    return (
        <div className='my-10'>
            <div className='all__products flex flex-row flex-wrap justify-evenly items-center'>
                { 
                    products.length > 0 && !isSearching ? products.map( ( product, index ) => (

                        <ProductCard
                        key={ index }
                        index={ index }
                        title={ product.title }
                        image={ product.image }
                        stockAvailable={ product.stock }
                        lastUpdate={ product.lastUpdate }
                        price={ product.price }
                        currency={ product.currency }
                        />

                    ) ) 
                    :
                    products.length > 0 && !isSearching ?
                    <div 
                    style={{ height:'70vh' }}
                    className='flex items-center justify-center px-5'>
                        <h1 className='font-semibold text-3xl text-center text-green-400'> 
                        Nothing here, add one product to see something 😊 
                        </h1> 
                    </div>
                    :
                    <div className='w-full text-center'>
                        <PropagateLoader/>
                    </div>
                }

            </div>
        </div>
    );
};

export default Products;
