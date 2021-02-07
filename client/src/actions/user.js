export const setUser = ( userData ) => {

    return { type:'SET_USER', payload:userData };

};

export const setClearUser = () => {

    return { type:'CLEAR_USER' };

};