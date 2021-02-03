import React from 'react'
import { defaultTransiton, outlineButton } from '../../../constants/styles';

const OutlineButtonCircle = ( props ) => {

    const { textButton, textColor } = props;

    return (
        <button
        className={ outlineButton }
        type="button" 
        style={ defaultTransiton }
        >
            { textButton }
            
        </button>
    );
};

export default OutlineButtonCircle;
