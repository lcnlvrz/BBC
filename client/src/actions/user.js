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

export const uploadOneProduct = ( products ) => {

    return { type:'UPLOAD_ONE_PRODUCT', payload:products };

};

export const updateOneProduct = ( indexProduct, newInfoProduct ) => {

    return { type:'UPDATE_INFO_PRODUCT', payload:{ indexProduct, newInfoProduct } };

};

export const deleteOneProduct = ( indexProduct ) => {
    
    return { type:'DELETE_PRODUCT', payload:indexProduct };

};

export const updateBannerSectionProducts = ( url ) => {
    
    return { type:'UPDATE_BANNER_SECTION_PRODUCTS', payload:url }; 

};

export const deleteBannerSectionProducts = () => {

    return { type:'DELETE_BANNER_SECTION_PRODUCTS' };

};

export const updateSectionProductsText = ( newTitle ) => {

    return { type:'UPDATE_SECTION_PRODUCTS_TEXT', payload:newTitle };

};

export const updateRealTimeData = ( newRealTimeData ) => {

    return { type:'UPDATE_REAL_TIME_DATA', payload:newRealTimeData };

};
