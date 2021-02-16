import React from 'react';
import { useInView } from 'react-intersection-observer';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { outlineButton, defaultTransiton } from '../../../../constants/styles';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded';

const Advantages = () => {

    
    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const number = [{ title:'IMPROVE YOUR CONVERSION RATIO', bgColor:'bg-gray-200', textColor:'text-black', text:'Target users to your business profile and increase the conversion ratio', icon:'trendingUp' }, 
    { title:'CLOSE THE SELL EASILY', bgColor:'bg-gray-300', textColor:'text-black', icon:'happyFace', text:'In your business profile there are only essential information. No more repeat the same thing every time' }
    ,{ title:'100% CONTROL', bgColor:'bg-gray-400', textColor:'text-black', icon:'control', text:'With the admin panel you can manage all of your business. Zero regulation.' }];

    return (
        <Grow 
        in={inView}
        className='text-center all__advantages flex flex-row flex-wrap items-center justify-evenly'
        ref={ref} 
        >
            <Paper
            style={{ boxShadow:'none' }}
            >
            { number.map( ( number, index ) => (

                    <div 
                    key={ index }
                    style={ defaultTransiton }
                    className={ `one__advantage rounded-full py-5 px-10 mx-5 ${ number.bgColor } space-y-2 w-72 my-5 hover:shadow-2xl cursor-pointer z-10` }>
                        { number.icon === 'happyFace' && <SentimentVerySatisfiedRoundedIcon style={ { fontSize:'50px', color:number.colorIcon }}/> }
                        { number.icon === 'time' &&
                        <TimerRoundedIcon style={ { fontSize:'50px' } }/>}
                        { number.icon === 'trendingUp' && <TrendingUpRoundedIcon
                        style={ { fontSize:'50px', color:number.colorIcon }}
                        /> }
                        { number.icon === 'control' && <ControlCameraRoundedIcon
                         style={ { fontSize:'50px', color:number.colorIcon }}
                        /> }
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
            </Paper>
        </Grow>
    );
};

export default Advantages;
