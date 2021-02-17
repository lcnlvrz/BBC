import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Fade } from '@material-ui/core';
const Questions = () => {

    const [ref, inView] = useInView({
        triggerOnce: true,
        delay:300
    });


    return (
        <Fade in={ inView }>
            <div 
            ref={ ref }
            className='space-y-20 my-16 px-4'>
                <div className='flex items-center justify-center flex-col space-y-5'>
                    <h1 
                    className='text-3xl text-red-700'> 
                        WHAT IS <span className='font-serif font-semibold'>BCC</span>?
                    </h1>
                    <p className='text-center italic'> 
                        Business Client Connection is a free web application useful to service as landing page or presentation letter to business. With our platform you can create a business profile, showing to the clients/potential clients what does your business do, presentation, advantages, location, schedule, products/services and more essential information. Besides, we have our major feature which is live chat.      
                    </p>
                </div>
                <div className='flex items-center justify-center flex-col space-y-5'>
                    <h1 className='text-3xl text-red-700 text-center'> 
                        WHO <span className='font-serif font-semibold'>BUSINESS</span> ARE THERE HERE?
                    </h1>
                    <p className='text-center italic'> 
                        Just search in our navbar and watch if there is the business are you looking for. If it doesn't here and you would like to see it in our plataform, tell it to sign up in BBC.
                    </p>
                </div>
                <div className='flex items-center justify-center flex-col space-y-5'>
                    <h1 className='text-3xl text-red-700 text-center'> 
                        HOW MUCH DOES IT <span className='font-serif font-semibold'>COST?</span>
                    </h1>
                    <p className='text-center italic'> 
                        This plataform is totally free for the people who searchs information and for the business uses our plataform to create their profile
                    </p>
                </div>
            </div>
        </Fade>
    );
};

export default Questions;
