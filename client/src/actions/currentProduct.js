


export const setCurrentProduct = ( currentProductData ) => {


    return { type:'SET_CURRENT_PRODUCT', payload:currentProductData };

};

export const clearCurrentProduct = () => {

    return { type:'CLEAR_CURRENT_PRODUCT' };

};