import React from 'react';
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from './HeaderMobile';
import HeaderDesktop from './HeaderDesktop';

const Header = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    if ( mobileResolution ) return <HeaderMobile/>

    return <HeaderDesktop/>
};

export default Header;
