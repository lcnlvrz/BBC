import React from 'react';
import { useInView } from 'react-intersection-observer';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import { defaultTransiton } from '../../../../constants/styles';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import TrendingUpRoundedIcon from '@material-ui/icons/TrendingUpRounded';
import ControlCameraRoundedIcon from '@material-ui/icons/ControlCameraRounded';
import { advantagesHome } from '../../../../constants/content';

const Advantages = () => {
    
    const [ref, inView] = useInView({
        triggerOnce: true
    });

    return (
        <Grow 
        in={inView}
        className='text-center all__advantages flex flex-row flex-wrap items-center justify-evenly'
        ref={ref} 
        >
            <Paper
            style={{ boxShadow:'none' }}
            >
            { advantagesHome.map( ( number, index ) => (

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
