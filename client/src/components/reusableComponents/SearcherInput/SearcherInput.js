import React, { useRef } from 'react'
import SearchRoundedIcon from '@material-ui/icons/SearchRounded';
import { defaultTransiton } from '../../../constants/styles';

const SearcherInput = ( props ) => {

    const { placeholder, name } = props;

    const searcherRef = useRef( null );

    return (
        <div 
        ref={ searcherRef }
        style={ defaultTransiton }
        className='flex flex-row items-center outline-none border-2 rounded-full py-2 px-2 active:border-gray-500 w-full'>
            <SearchRoundedIcon/>
            <input
            name={ name }
            placeholder={ placeholder }
            onBlur={ () => searcherRef.current.classList.remove( 'border-black' )  }
            onFocus={ () => searcherRef.current.classList.add( 'border-black' )  }
            className='w-full outline-none px-2'
            />
        </div>
        
    );
};

export default SearcherInput;
