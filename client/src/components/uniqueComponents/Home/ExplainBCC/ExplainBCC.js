import React from 'react';
import LiveChat from './LiveChat';
import BusinessProfile from './BusinessProfile';
import Product from './Product';


const ExplainBCC = () => {

   
    return (

        <div className='flex flex-col space-y-28'>
            <LiveChat/>
            <BusinessProfile/>
            <Product/>
        </div>
       
    );
};

export default ExplainBCC;
