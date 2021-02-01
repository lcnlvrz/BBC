import React, { useRef } from 'react';
import Header from './Header';
import Body from './Body';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { defaultTransiton, outlineButton } from '../../../constants';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import winWin from '../../../images/winWin.jpg';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';
import businessIMG from '../../../images/business.jpg';
import OutlineButtonCircle from '../../reusableComponents/OutlineButtonCircle';
import logoBCC from '../../../images/bccLogo.png';

const Home = () => {

    const number = [{ title:'DONT LOSE YOUR TIME', bgColor:'bg-gray-200', textColor:'text-black', text:'Before go to any business, search it and look if they can service you a good experience', icon:'time' }, 
    { title:'FEEL COMFORTABEL', bgColor:'bg-gray-300', textColor:'text-black', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full. ' }
    ,{ title:'FEEL COMFORTABEL', bgColor:'bg-gray-400', textColor:'text-black', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full. ' }, { title:'FEEL COMFORTABEL', bgColor:'bg-gray-500', textColor:'text-white', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full.', colorIcon:'white' }, { title:'FEEL COMFORTABEL', bgColor:'bg-gray-600', textColor:'text-white', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full.', colorIcon:'white' }];

    return (
        <div>
            <div 
            className='sticky top-0 z-50 bg-white'>
                <Header/>
            </div>
            <Body/>
            <div className='space-y-20 my-16 px-2'>
                <div className='flex items-center justify-center flex-col space-y-5'>
                    <h1 className='text-3xl text-red-700'> 
                        WHAT IS <span className='font-serif font-semibold'>BCC</span>?
                    </h1>
                    <p className='text-center italic'> 
                        <span className='font-semibold font-serif not-italic'>B</span>usiness <span className='font-semibold font-serif not-italic'>C</span>lient <span className='font-semibold font-serif not-italic'>C</span>onecction is a free web application to help any business to manage his time efficiently giving data about how many people there are in the shop, how many persons are working, customer service hours, stock avaible, chat and more stuff. All of these things in real time.      
                    </p>
                </div>
                <div className='flex items-center justify-center flex-col space-y-5'>
                    <h1 className='text-3xl text-red-700 text-center'> 
                        WHOSE <span className='font-serif font-semibold'>BUSINESS</span> ARE THERE HERE?
                    </h1>
                    <p className='text-center italic'> 
                        Just search in our navbar and watch if there is the business that are you looking for. If it doesn't here and you would like to see it in our plataform, tell it to sign up in BBC.
                    </p>
                </div>
            </div>
            <div className='text-center all__advantages flex flex-row flex-wrap items-center justify-evenly'>
            { number.map( ( number, index ) => (

                    <div 
                    key={ index }
                    style={ defaultTransiton }
                    className={ `one__advantage rounded-full py-5 px-10 mx-5 ${ number.bgColor } space-y-2 w-72 my-5 hover:shadow-2xl cursor-pointer z-10` }>
                        { number.icon === 'happyFace' && <SentimentVerySatisfiedRoundedIcon style={ { fontSize:'50px', color:number.colorIcon }}/> }
                        { number.icon === 'time' &&
                        <TimerRoundedIcon style={ { fontSize:'50px' } }/>}
                        <div className='whitespace-pre-line pb-5'>
                            <h1 className={ `text-lg font-semibold ${ number.textColor }` }> 
                                { number.title }
                            </h1>
                            <p className={ `font-light text-sm ${ number.textColor }` }> 
                               { number.text }
                            </p>
                        </div>
                    </div>
             

            ) ) }
            </div>
            <div className='my-16'>
                <div className='flex flex-col items-center my-5'>
                    <div className='space-y-2 text-center mx-5'>
                        <h1 className='font-light text-4xl text-red-500'> 
                            THIS IS <span className='font-semibold text-yellow-400'>WIN WIN</span>
                        </h1>
                        <p className='text-center '> 
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
                    <button
                    style={ defaultTransiton }
                    className={ outlineButton }
                    >
                        SIGN UP
                    </button>
                </div>
                <img 
                className='opacity-40'
                alt=''
                src={ businessIMG }
                />
            </div>
            <footer className='bg-gray-300 p-5'>
                <img
                className='w-14'
                src={ logoBCC }
                alt='BCC LOGO'/>
                <div className='my-5'>
                    <h4 className='font-semibold'> About Us </h4>
                    <p> BBC is an application web that connect business and client for best communiccation. We generate two benefits, one for client and another for the business. All win using our plataform. </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
