import React, { useRef } from 'react';
import { defaultTransiton } from '../../../../constants';
import CoverHome from '../../../../images/homeDrawVector.jpg';
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import SearcherInput from '../../../reusableComponents/SearcherInput';
import { useMediaQuery } from 'react-responsive';

const Body = () => {


    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const searcher = useRef( null );

    return (
        <div className='w-full flex flex-col items-center justify-center p-4 w-full'>
            <div className='flex items-center justify-center h-full flex flex-col space-y-5 w-full'>
                <h1 
                className={`font-light ${ mobileResolution ? 'text-lg' : 'text-3xl' } text-center text-gray-400`}> 
                    <span className='text-gray-800 font-bold'>Search</span> whats <span className='text-gray-800 font-bold'> happening </span> in any <span className='text-gray-800 font-bold'>business</span> right now 
                </h1>
                <div 
                style={ defaultTransiton }
                ref={ searcher }
                className='flex flex-row items-center outline-none border-2 rounded-full py-2 px-2 active:border-gray-500 w-full'>
                    <SearchRoundedIcon/>
                    <SearcherInput
                    searcherRef={ searcher }
                    />
                </div>
            </div>
            <img 
            className={ `${ mobileResolution ? 'w-full' : 'w-2/4' }` }
            alt='Search Vector'
            src={ CoverHome }
            /> 
            <h1 className='text-2xl text-gray-400 font-light'> 
                All plataforms, <span className='font-semibold text-black'>one site.</span> 
            </h1> 
        </div>
    );

};


export default Body;
