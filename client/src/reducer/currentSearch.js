
const initialState = {

    isLoading:true,
    business:null

};


const currentSearch = ( state = initialState, action ) => {

    switch (action.type) {

        case 'SET_CURRENT_SEARCH':
            
            return action.payload;

        case 'CLEAR_CURRENT_SEARCH':

            return { isLoading:false, business:null };
    
        default:
            return state;

    };

};

export default currentSearch;