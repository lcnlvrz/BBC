import React from 'react'
import ProductCard from '../../../reusableComponents/ProductCard/ProductCard';

const Products = () => {

    
    const products = [ { title:'Air Max White 95', image:'https://content.nike.com/content/dam/one-nike/en_lu/SP17/Homepage/0326-HP-Vapormax/0321_DESIGN_LDZERO_CROP_1600x600_.jpg.transform/full-screen/0321_DESIGN_LDZERO_CROP_1600x600_.jpg' }, { title:'VaiporMax Triple', image:'https://d2h1pu99sxkfvn.cloudfront.net/b0/7372421/493684995_dePF3mM29u/P0.jpg' }, { title:'Shirt Nike Retro', image:'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/15a721d0-9e77-44ee-b406-d9fc9950b1f4/dri-fit-giannis-freak-mens-basketball-t-shirt-T9KgK1.jpg' } ];

    return (
        <div className='my-10'>
            <div className='all__products flex flex-row flex-wrap justify-evenly items-center'>
                { products.map( ( product, index ) => (

                    <ProductCard
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
