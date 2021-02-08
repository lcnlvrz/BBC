export const setUser = ( userData ) => {

    return { type:'SET_USER', payload:userData };

};

export const setClearUser = () => {

    return { type:'CLEAR_USER' };

};

export const setProfilePhoto = ( url ) => {

    return { type:'SET_PROFILE_PHOTO', payload:url };

};