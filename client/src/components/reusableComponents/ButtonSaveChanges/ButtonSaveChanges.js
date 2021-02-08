import React from 'react';
import { Avatar, Fade, TextareaAutosize } from '@material-ui/core';
import PropagateLoader from "react-spinners/PropagateLoader";
import { defaultTransiton, fillButton } from '../../../constants/styles';

const ButtonSaveChanges = ( props ) => {

    const { isNewChange, isLoading } = props;

    return (
        <Fade in={ isNewChange }>
            <div className='fixed left-0 bottom-2 flex items-center justify-end w-max-full right-0'>
                { isLoading 
                ?
                <div className='my-5 mr-20'> 
                <PropagateLoader color='	#90ee90'/> 
                </div>
                : 
                <button
                type='submit'
                className={ fillButton }
                style={ defaultTransiton }
                >
                Save Changes
                </button> }
            </div>
        </Fade>
    );
};

export default ButtonSaveChanges;
