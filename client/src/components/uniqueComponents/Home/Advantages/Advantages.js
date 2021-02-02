import React from 'react';
import { useInView } from 'react-intersection-observer';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import FiberManualRecordRoundedIcon from '@material-ui/icons/FiberManualRecordRounded';
import { outlineButton, defaultTransiton } from '../../../../constants';
import SentimentVerySatisfiedRoundedIcon from '@material-ui/icons/SentimentVerySatisfiedRounded';
import winWin from '../../../../images/winWin.jpg';
import ArrowDownwardRoundedIcon from '@material-ui/icons/ArrowDownwardRounded';

const Advantages = () => {

    
    const [ref, inView] = useInView({
        triggerOnce: true
    });

    const number = [{ title:'DONT LOSE YOUR TIME', bgColor:'bg-gray-200', textColor:'text-black', text:'Before go to any business, search it and look if they can service you a good experience', icon:'time' }, 
    { title:'FEEL COMFORTABEL', bgColor:'bg-gray-300', textColor:'text-black', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full. ' }
    ,{ title:'FEEL COMFORTABEL', bgColor:'bg-gray-400', textColor:'text-black', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full. ' }, { title:'FEEL COMFORTABEL', bgColor:'bg-gray-500', textColor:'text-white', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full.', colorIcon:'white' }, { title:'FEEL COMFORTABEL', bgColor:'bg-gray-600', textColor:'text-white', icon:'happyFace', text:'Arrive to the business in a good moment and vibes. Dont go there if its full.', colorIcon:'white' }];

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
