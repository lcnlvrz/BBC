import React, { useState, useEffect, useRef } from 'react';
import { Fragment } from 'react';
import LiveChat from './LiveChat';
import BusinessProfile from './BusinessProfile';
import Product from './Product';
import WelcomeMessage from '../../../reusableComponents/WelcomeMessage';


const ExplainBCC = () => {

   
    return (

        <div className='flex flex-col space-y-28'>
            <LiveChat/>
            <BusinessProfile/>
            <Product/>
            <WelcomeMessage
            emojiWidth='w-1/4'
            />
        </div>
       
    );
};

export default ExplainBCC;
