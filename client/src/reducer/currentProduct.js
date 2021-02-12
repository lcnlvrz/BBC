

const initialState = {

    isLoading:true,
    product:false

};

const currentProduct = ( state = initialState, action ) => {

    switch (action.type) {
        case  'SET_CURRENT_PRODUCT' :
            
            return { ...action.payload, isLoading:false, product:true };

        case 'CLEAR_CURRENT_PRODUCT':

            return { isLoading:false, product:null };  
    
        default:
            return state;
    };

};

export default currentProduct;