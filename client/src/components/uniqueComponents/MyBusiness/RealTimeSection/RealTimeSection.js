import React from 'react';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import Badge from '@material-ui/core/Badge';
import Location from '../../../../images/location.jpg';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import ChatBubbleRoundedIcon from '@material-ui/icons/ChatBubbleRounded';
import { fillButton } from '../../../../constants/styles';
import moment from 'moment';
import { Link } from 'react-router-dom';

const RealTimeSection = ( props ) => {

    const { since, until, location, personalWorking, clientsInTheShop, lastUpdateClientsInTheShop, lastUpdatePersonalWorking, businessName, username } = props;

    const parseOne = moment.unix( lastUpdatePersonalWorking ).format();
    const parseTwo = moment.unix( lastUpdateClientsInTheShop ).format();


    return (
        <div className='flex flex-row items-center flex-wrap justify-center'>
            <div 
            className='flex flex-col items-center text-center m-10 space-y-2'>
                <LocationOnRoundedIcon 
                className='text-red-600'
                style={ { fontSize:'100px' } }/>
                <h1 className='font-light italic text-lg'> 
                    { location }
                </h1>
                <h1 className='text-2xl'> 
                    { since } - { until } 
                </h1>
                <a href='https://google.maps'>
                    <h3 className='text-lg text-blue-400 font-light'>
                        How i get there?
                    </h3>
                </a>
            </div>
            <div className='flex m-10 flex-col items-center justify-center space-y-3'>
                <WorkRoundedIcon
                className='text-green-500'
                style={{ fontSize:'100px' }}
                />
                <h1 className='font-light text-2xl text-center leading-6'> 
                    <span className='font-semibold'>{ personalWorking }</span> persons working in the shop now
                </h1>
                <h1 className='text-md text-gray-400'> 
                    Updated { moment( parseOne ).fromNow() }
                </h1>
            </div>
            <div className='flex m-10 flex-col items-center justify-center space-y-3'>
                <PeopleAltRoundedIcon
                className='text-yellow-500'
                style={{ fontSize:'100px' }}
                />
                <h1 className='font-light text-2xl text-center leading-6'> 
                    There are <span className='font-semibold'> { clientsInTheShop } </span> clients in the shop now
                </h1>
                <h1 className='text-md text-gray-400'> 
                    Updated { moment( parseTwo ).fromNow() }
                </h1>
            </div>
            <div className='flex m-10 flex-col items-center justify-center space-y-5'>
                <ChatBubbleRoundedIcon
                className='text-blue-500'
                style={{ fontSize:'100px' }}
                />
                <h1 className='font-light text-2xl text-center'> 
                    Do you have some questions?
                </h1>
                <Link
                to={ `/business/chat/?username=${ username }` }>
                    <button
                    className={ fillButton }
                    >
                        CHAT NOW WITH { businessName }
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default RealTimeSection;
