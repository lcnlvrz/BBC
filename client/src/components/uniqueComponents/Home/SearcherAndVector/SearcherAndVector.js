import React, { useEffect } from 'react';
import womenSearchingOnMobile from '../../../../images/homeDrawVector.jpg';
import SearcherInput from '../../../reusableComponents/SearcherInput';
import { useMediaQuery } from 'react-responsive';
import ImageContainer from '../../../reusableComponents/ImageContainer';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useSearchBusiness } from '../../../../hooks/useSearchBusiness';
import BusinessResult from '../BusinessResult';
import PropagateLoader from "react-spinners/PropagateLoader";
import AlertAnimation from '../../../reusableComponents/AlertAnimation/AlertAnimation';

const Body = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { setQuery, cancelToken, business, notFound, setNotFound, isSearching } = useSearchBusiness();

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    return (
        <div className='w-full flex flex-col items-center justify-center p-4'>
            <div className='flex items-center justify-center h-full flex-col space-y-5 w-full'>
                <h1 
                className={`font-light ${ mobileResolution ? 'text-2xl' : 'text-3xl' } text-center text-gray-400`}> 
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
