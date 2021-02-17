import React from 'react'
import WelcomeMessage from '../../../reusableComponents/WelcomeMessage';
import HeaderMobile from '../../HeaderForBusiness/HeaderMobile/HeaderMobile';

const WelcomeMobile = () => {

    return (
        <div>
            <HeaderMobile/>
            <WelcomeMessage emojiWidth='w-12' welcomeWidth='text-5xl' padding='px-5'/>
        </div>
    );
};

export default WelcomeMobile;
