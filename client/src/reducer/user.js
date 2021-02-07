
const initialState = {
    
    businessName:'',
    username:'',
    userID:'',
    isLoading:true

};

const user = ( state = initialState, action ) => {

    switch (action.type) {
        case 'SET_USER':
            
            return action.payload;

        case 'CLEAR_USER':

            return { ...initialState, isLoading:false };
    
        default:
            return state;
    };

};

export default user;