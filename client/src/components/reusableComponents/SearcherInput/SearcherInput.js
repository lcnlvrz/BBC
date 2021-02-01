import React from 'react'

const SearcherInput = ( props ) => {

    const { searcherRef:searcher } = props;

    return (
        <input
        placeholder='Business Name&#39;s'
        onBlur={ () => searcher.current.classList.remove( 'border-black' )  }
        onFocus={ () => searcher.current.classList.add( 'border-black' )  }
        className='w-full outline-none px-2'
        />
    );
};

export default SearcherInput;
