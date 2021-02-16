import { Avatar } from '@material-ui/core';
import React from 'react';
import { Fade } from '@material-ui/core';
import { Fragment } from 'react';
import ImageContainer from '../ImageContainer';

const MessageChat = ( props ) => {

    const { isOwnMessage, isOtherMessage, content, showIn } = props;

    const { profilePhoto, name, message, timeAgo, isMedia, image } = content;

    if ( isOtherMessage ) return (
        <Fragment>
            { showIn ?  
            <Fade in={ showIn }>
                <div 
                className='p-5 one__message__other__user w-full flex flex-col space-y-2'>
                    <div className='flex flex-row items-center space-x-2'>
                        <Avatar
                        src={ profilePhoto }
                        className='bg-white'
                        />
                        <div className='bg-white rounded-2xl w-3/4'>
                            <div className='element w-full'>
                                <h3 className='text-gray-500 font-semibold pt-2 px-2 text-left truncate'> 
                                    { name }
                                </h3>
                            </div>
                            { isMedia ?

                                <ImageContainer
                                src={ image }
                                widthMobile='w-full'
                                widthDesktop='w-full'
                                />
                                :
                                <h3 className='font-semibold text-black pt-2 px-2 text-left break-words'> 
                                    { message }
                                </h3> 
                            }
                            <div className='flex w-full items-end justify-end p-2 font-light text-sm'>
                                { timeAgo }
                            </div>
                        </div> 
                    </div>
                </div>
            </Fade> 
            :
            <div></div>}
        </Fragment> 
    );



    if ( isOwnMessage ) return (
        <Fragment>
            { showIn ? 

                <Fade in={ showIn }>
                    <div
                    className='p-5 one__message__other__user w-full flex flex-col space-y-2'>
                        <div className='flex flex-row justify-end items-center space-x-2'>
                            <div className='bg-white rounded-2xl w-3/4'>
                                <div className='element w-full'>
                                    <h3 className='text-gray-500 font-semibold pt-2 px-2 text-right truncate'> 
                                        <span className='font-light'>You as</span> { name }
                                    </h3>
                                </div>
                                <h3 className='font-semibold text-black pt-2 px-2 text-left break-words'> 
                                    { message }
                                </h3>                 
                                <div className='flex w-full items-start justify-start p-2 font-light text-sm'>
                                    { timeAgo } 
                                </div>
                            </div>
                            <Avatar
                            src={ profilePhoto }
                            className='bg-white'
                            /> 
                        </div>
                    </div>
                </Fade> 
                :
                <div></div>

            }
        </Fragment>
    );

    
};

export default MessageChat;
