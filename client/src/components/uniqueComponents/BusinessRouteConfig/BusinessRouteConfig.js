import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import HeaderMobile from '../HeaderForBusiness/HeaderMobile/HeaderMobile';
import HeaderForBusiness from '../HeaderForBusiness';
import { sections, titleSections } from '../../../constants/content';
import { Fragment } from 'react';
import NotFoundPage from '../../reusableComponents/NotFoundPage';

const BusinessRouteConfig = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const url = new URL( window.location.href );

    const section = url.searchParams.get( 'section' );

    const [sectionToRender, setSectionToRender] = useState( '' );

    useEffect(() => {

        setSectionToRender( section );
        window.scrollTo(0,0);
        
    }, [ section ]);

    if ( mobileResolution ) return (
        
        <Fragment>
            { sectionToRender !== 'live-chat' && <HeaderMobile sectionToRender={ sectionToRender }/> }
            { sections.map( ( section, index ) => section.title === sectionToRender && <section.component key={ index }/> ) }
            { titleSections.every( ( value ) => value !== sectionToRender ) && <NotFoundPage/> }
        </Fragment>
    
    );
    
    return (
    
        <HeaderForBusiness sectionToRender={ sectionToRender }>

            { sections.map( ( section, index ) => section.title === sectionToRender && <section.component key={ index }/> ) }
            { titleSections.every( ( value ) => value !== sectionToRender ) && <NotFoundPage/> }

        </HeaderForBusiness>
    
    );


};

export default BusinessRouteConfig
