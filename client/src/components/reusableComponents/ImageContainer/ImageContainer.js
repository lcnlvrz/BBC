import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useMediaQuery } from 'react-responsive';
import './ImageContainer.css';
import Fade from '@material-ui/core/Fade';
import { Paper } from '@material-ui/core';
import Grow from '@material-ui/core/Grow';

const ImageContainer = ( props ) => {

    const { src, widthMobile, widthDesktop, heightPX, altDescription, opacity } = props;

    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const [isImageLoaded, setIsImageLoaded] = useState( false );

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    return (
        <div 
        className={ mobileResolution ?  widthMobile : widthDesktop  }>
            { !isImageLoaded &&  
            <div 
            style={{ paddingBottom:heightPX }}
            id='image__skeleton__loading'
            className='w-full my-2'
            ></div> }
            <Grow 
            ref={ ref }
            in={ inView }>
                    <img 
                    style={{ opacity:opacity, height:heightPX }}
                    onLoad={ () => setIsImageLoaded( true ) }
                    className={ `w-full my-2 object-contain` }
                    alt={ altDescription }
                    src={ src }
                    /> 
            </Grow>   
        </div>
    );
};

export default ImageContainer;
