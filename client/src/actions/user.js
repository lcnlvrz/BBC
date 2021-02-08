export const setUser = ( userData ) => {

    return { type:'SET_USER', payload:userData };

};

export const setClearUser = () => {

    return { type:'CLEAR_USER' };

};

export const setProfilePhoto = ( url ) => {

    return { type:'SET_PROFILE_PHOTO', payload:url };

};

export const setBanner = ( url ) => {

    return { type:'SET_BANNER', payload:url };

};

export const deleteProfilePhoto = () => {

    return { type:'DELETE_PROFILE_PHOTO' };

};

export const deleteBanner = () => {

    return { type:'DELETE_BANNER' };

};

export const updateInfo = ( info ) => {

    return { type:'UPDATE_INFO', payload:info };

};

export const updateSocialMedia = ( socialMedias ) => {

    return { type:'UPDATE_SOCIAL_MEDIA', payload:socialMedias };

};