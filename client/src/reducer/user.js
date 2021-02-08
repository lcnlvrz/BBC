
const initialState = {
    
    businessName:'',
    username:'',
    userID:'',
    isLoading:true,
    condition:'',
    profilePhoto:''

};

const user = ( state = initialState, action ) => {

    switch (action.type) {
        case 'SET_USER':
            
            return action.payload;

        case 'CLEAR_USER':

            return { ...initialState, isLoading:false };

        case 'SET_PROFILE_PHOTO':

            return { ...state, profilePhoto:action.payload };
    
        default:
            return state;
    };

};

export default user;