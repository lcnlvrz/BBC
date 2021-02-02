import React from 'react'
import ImageContainer from '../../../reusableComponents/ImageContainer'
import businessIMG from '../../../../images/business.jpg';
import { defaultTransiton, fillButton, signUpLink } from '../../../../constants'
import { Link } from 'react-router-dom';

const Prefooter = () => {
    return (
        <>
        <div className='my-16'>
            <div className='flex flex-col items-center my-5'>
                <div className='space-y-2 text-center mx-5'>
                    <h1 className='font-light text-4xl text-red-500'> 
                        THIS IS <span className='font-semibold text-yellow-400'>WIN WIN</span>
                    </h1>
                    <p className='text-center   text-lg'> 
                        With you search, you save time and help's the business to manage his space and time very well 
                    </p>
                </div>   
            </div>
        </div>
        <div className='my-16 flex items-center justify-center'>
            <div className='absolute flex flex-col items-center z-10 space-y-5'>
                <h1 className='font-semibold text-2xl text-center'> 
                    Are you a business owner?  
                </h1>
                <Link to={ signUpLink }>
                    <button
                    style={ defaultTransiton }
                    className={ fillButton }
                    >
                        SIGN UP NOW FREE
                    </button>
                </Link>
            </div>
            <ImageContainer
            heightPX='300px'
            altDescription='People lean start up'
            opacity={ 0.3 }
            src={ businessIMG }
            widthDesktop='w-2/4'
            widthMobile='w-full'
            />
        </div>
        </>
    )
}

export default Prefooter
