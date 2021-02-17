import React from 'react';
import DoneRoundedIcon from '@material-ui/icons/DoneRounded';
import HourglassFullRoundedIcon from '@material-ui/icons/HourglassFullRounded';
import { defaultTransiton } from '../../../../constants/styles';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const OnePanelSection = ( props ) => {

    const { section } = props;

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const classesParentDiv = `w-full flex flex-row justify-evenly items-center ${ mobileResolution ? 'space-y-5' : 'space-x-5' } one__section flex-wrap rounded-2xl shadow-lg cursor-pointer p-5 bg-white hover:bg-black hover:text-white`;

    const LeftPart = () => {

        return (

            <div className='flex flex-col items-center w-40'>
                <section.icon
                style={{ fontSize:'120px' }}
                />
                <h1 className='font-semibold'> 
                    { section.title }
                </h1>
            </div>

        );

    };

    const RightPart = () => {

        const ItemsAndValues = ( props ) => {

            const { item } = props;

            return (
                <div className='one__item flex flex-row items-center space-x-2'>
                    <item.icon/>
                    <h3 className='font-light'> 
                        { item.title }: 
                    </h3>
                    { item.value === true ? <DoneRoundedIcon className='text-green-400'/> : item.value === false ? <HourglassFullRoundedIcon className='text-red-500'/> : <h2 className='font-semibold'> { item.value } </h2> }
                </div>
            );

        };

        return (

            <div className='flex flex-col space-y-3 w-60  items-start'>
                { section.items.map( ( item, index ) => <ItemsAndValues key={index} item={item}/> ) }
            </div>

        );

    };
    
    return (
        <Link to={ section.route }>
            <div style={ defaultTransiton } className={ classesParentDiv }>
                <LeftPart/>
                <RightPart/>
            </div>
        </Link>
    );
};

export default OnePanelSection;
