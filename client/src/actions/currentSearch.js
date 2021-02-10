
export const setCurrentSearch = ( dataCurrentSearch ) => {

    return { type:'SET_CURRENT_SEARCH', payload:dataCurrentSearch };

};

export const setClearSearch = () => {

    return { type:'CLEAR_CURRENT_SEARCH' };

};
