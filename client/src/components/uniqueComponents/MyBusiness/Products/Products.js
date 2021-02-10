import React from 'react'
import ProductCard from '../../../reusableComponents/ProductCard/ProductCard';

const Products = ( props ) => {

    const { products } = props;

    console.log( products );

    return (
        <div className='my-10'>
            <div className='all__products flex flex-row flex-wrap justify-evenly items-center'>
                { products.map( ( product, index ) => (

                    <ProductCard
                    key={ index }
                    index={ index }
                    title={ product.title }
                    image={ product.image }
                    stockAvailable='45'
                    lastUpdate='10 min ago'
                    price='525'
                    currency='ARS'
                    />

                ) ) }

            </div>
        </div>
    );
};

export default Products;
