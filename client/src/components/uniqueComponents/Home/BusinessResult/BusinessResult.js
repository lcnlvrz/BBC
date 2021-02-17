import React from 'react';
import { defaultTransiton } from '../../../../constants/styles';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import { Link } from 'react-router-dom';
import { setCurrentSearch } from '../../../../actions/currentSearch';
import { useDispatch } from 'react-redux';
import AvatarStatus from '../../../reusableComponents/AvatarStatus.js';


const BusinessResult = ( props ) => {

    const { company } = props;

    const dispatch = useDispatch();

    return (
        <Link 
        onClick={ () => dispatch( setCurrentSearch( { ...company, isLoading:false, business:true } ) ) }
        to={ `/search/business/?username=${ company.username }` }>
            <div 
            style={ defaultTransiton }
            className={ `flex flex-row items-center flex-wrap space-x-2 justify-evenly space-y-5 hover:bg-black hover:text-white cursor-pointer p-5 rounded banner__searching__business relative overflow-hidden` }>
                <div className='flex flex-row space-x-2'>
                    <AvatarStatus
                    status={ company.isOpenBusiness }
                    spacingBadge={2}
                    spacingAvatar={ 5 }
                    souceProfilePhoto={ company.profilePhoto }
                    vertical='bottom'
                    horizontal='right'
                    />
                    <div className='flex-col flex'>
                        <h3 className='font-semibold max-w-md'> 
                            { company.businessName }
                        </h3>
                        <h4 className='font-light text-sm max-w-md'> 
                            { company.businessCategory }
                        </h4>
                    </div>
                </div>
                <div className='flex flex-col items-center'>
                    <div className='flex flex-row items-center space-x-2 element'>
                        <h3 className='font-semibold truncate text-center'> 
                            <LocationOnRoundedIcon className='text-red-500 mr-2'/>
                           { company.location }
                        </h3>
                    </div>
                    <div className='flex flex-row items-center space-x-2'>
                        <WatchLaterRoundedIcon/>
                        <h3 className='font-semibold truncate'> 
                            { company.since } - { company.until }
                        </h3>
                    </div>
                </div>
                <div 
                style={{ backgroundImage:`url(${ company.banner })`, margin:0 }}
                className='background__banner__searching'></div>
            </div>
        </Link>
    );
};

export default BusinessResult;
