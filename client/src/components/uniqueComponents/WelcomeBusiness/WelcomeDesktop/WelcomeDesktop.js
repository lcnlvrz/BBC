import React from 'react';
import HeaderForBusiness from '../../HeaderForBusiness';
import WelcomeMessage from '../../../reusableComponents/WelcomeMessage';

const WelcomeDesktop = () => {

    const HtmlData = () => {

        return ( <WelcomeMessage emojiWidth='w-16' welcomeWidth='text-6xl'/> )

    };

    return (
        <>
            <HeaderForBusiness HtmlData={ HtmlData }/>
        </>
    );
};

export default WelcomeDesktop;
