import React from 'react';
import { useInView } from 'react-intersection-observer';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';

const Questions = () => {

    const [ref, inView] = useInView({
        triggerOnce: true
    });

    console.log( inView );

    return (
        <div 
        className='space-y-20 my-16 px-4'>
            <div className='flex items-center justify-center flex-col space-y-5'>
                <h1 
                ref={ref} 
                className='text-3xl text-red-700'> 
                    WHAT IS <span className='font-serif font-semibold'>BCC</span>?
                </h1>
                <p className='text-center italic'> 
                    <span className='font-semibold font-serif not-italic'>B</span>usiness <span className='font-semibold font-serif not-italic'>C</span>lient <span className='font-semibold font-serif not-italic'>C</span>onecction is a free web application to help any business to manage his time efficiently giving data to the public about how many people there are in the shop, how many persons are working, customer service hours, stock avaible, chat and more stuff. All of these things in real time.      
                </p>
            </div>
            <div className='flex items-center justify-center flex-col space-y-5'>
                <h1 className='text-3xl text-red-700 text-center'> 
                    WHOSE <span className='font-serif font-semibold'>BUSINESS</span> ARE THERE HERE?
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
                    This plataform is totally free for the people who searchs information and for the business uses our plataform to give the data.
                </p>
            </div>
        </div>
    );
};

export default Questions;
