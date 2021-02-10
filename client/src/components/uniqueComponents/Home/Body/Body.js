import React, { useEffect, useRef, useState } from 'react';
import { defaultTransiton } from '../../../../constants/styles';
import womenSearchingOnMobile from '../../../../images/homeDrawVector.jpg';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import SearcherInput from '../../../reusableComponents/SearcherInput';
import { useMediaQuery } from 'react-responsive';
import { LazyLoadComponent, LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImageContainer from '../../../reusableComponents/ImageContainer';
import 'react-lazy-load-image-component/src/effects/blur.css';
import PlaceHolderImage from '../../../../images/placeHolderHomeDrawVector.jpg';
import { useSearchBusiness } from '../../../../hooks/useSearchBusiness';
import { Avatar } from '@material-ui/core';
import { StyledBadgeBusinessProfile, useStylesBusinessProfile } from '../../BusinessProfile/styles';
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import BusinessResult from '../BusinessResult';
import PropagateLoader from "react-spinners/PropagateLoader";
import AlertAnimation from '../../../reusableComponents/AlertAnimation/AlertAnimation';

const Body = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const searcher = useRef( null );

    const [imageLoaded, setImageLoaded] = useState( false );

    const { setQuery, isLoading, setIsLoading, cancelToken, business, query, notFound, setNotFound, isSearching } = useSearchBusiness();

    const useStylesBusinessProfile = makeStyles((theme) => ({
        large: {
          width: theme.spacing(5),
          height: theme.spacing(5)
        },
    }));

    const classes = useStylesBusinessProfile();

    const numbers = [ 0, 1 ];


    return (
        <div className='w-full flex flex-col items-center justify-center p-4'>
            <div className='flex items-center justify-center h-full flex-col space-y-5 w-full'>
                <h1 
                className={`font-light ${ mobileResolution ? 'text-lg' : 'text-3xl' } text-center text-gray-400`}> 
                    <span className='text-gray-800 font-bold'>Search</span> whats <span className='text-gray-800 font-bold'> happening </span> in any <span className='text-gray-800 font-bold'>business</span> right now 
                </h1>
                <form
                className='w-full'
                onChange={ (e) => setQuery( e.target.value ) }
                >
                    <SearcherInput
                    endPoint='business'
                    name='query'
                    placeholder='Business Name&#39;s'/>
                </form>
                <>
                { business.length > 0 &&
                <div className='w-full h-80 z-30 bg-white overflow-auto'>
                    { business.map( ( company, index ) => (
                        
                        <BusinessResult key={ index } company={ company }/>

                    ) )  }
                </div> }
                { isSearching
                &&
                <div className='py-5'>
                    <PropagateLoader/>
                </div>}
                </>
            </div>  
            <ImageContainer
            heightPX='400px'
            altDescription='Women Searching Something on Mobile'
            widthMobile='w-full'
            widthDesktop='w-2/4'
            src={ womenSearchingOnMobile }
            />
            <h1 className='text-2xl text-gray-400 font-light'> 
                All plataforms, <span className='font-semibold text-black'>one site.</span> 
            </h1> 
            { notFound && <AlertAnimation setCloseAlert={ setNotFound } message={ notFound.message } severity={ notFound.severity }/> }
        </div>
    );

};


export default Body;
