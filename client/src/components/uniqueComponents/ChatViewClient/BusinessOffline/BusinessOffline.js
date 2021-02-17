import React from 'react';
import { Avatar, Fade } from '@material-ui/core';
import { avatarSizeChat, badgeOnlineOrOffline } from '../../../reusableComponents/Chat/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';

const BusinessOffline = ( props ) => {

    const { currentSearch, isOnline } = props;

    const avatarSize = avatarSizeChat( 20 );

    const StyledBadge = badgeOnlineOrOffline( isOnline, 5 );

    return (
        <Fade in={ true }>
            <div className='h-screen flex flex-col items-center justify-center p-5 space-y-5'>
                <StyledBadge
                overlap="circle"
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
                variant="dot"
                >
                    <Avatar
                    className={ `${ avatarSize().large }` }
                    src={ currentSearch.profilePhoto }
                    />
                </StyledBadge>
                { !isOnline &&
                <div className='space-y-5 flex flex-col items-center justify-center'>
                    <div className='space-y-2'>
                        <h1 className='text-4xl text-center'>
                            Sorry, but { currentSearch.businessName } is offline now 😞
                        </h1> 
                        { (currentSearch.facebookLink || currentSearch.instagramLink) && 
                        <h3 className='text-sm text-center font-light'> 
                            Try to come again in another schedule or send message to theire social media: 
                        </h3> }
                    </div> 
                    <div className='flex flex-row space-x-10'>

                        { currentSearch.facebookLink 
                        &&
                        <a
                        rel="noreferrer"
                        target='_blank'
                        href={ currentSearch.facebookLink }
                        >
                            <FacebookIcon 
                            style={{ fontSize:'50px', transition:"all .15s ease" }}
                            className='text-green-300 hover:text-green-400 cursor-pointer'/> 
                        </a> 
                        }
                        { currentSearch.instagramLink 
                        &&
                        <a 
                        rel="noreferrer"
                        target='_blank'
                        href={ currentSearch.instagramLink }>
                            <InstagramIcon
                            className='text-green-300 hover:text-green-400'
                            style={{ fontSize:'50px', transition:"all .15s ease" }}
                            /> 
                        </a> 
                        }

                    </div>
                    
                </div>
                }
            </div>
        </Fade>
    );
};

export default BusinessOffline;
