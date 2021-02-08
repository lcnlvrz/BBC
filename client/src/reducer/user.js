
const initialState = {
    businessName:'',
    username:'',
    userID:'',
    isLoading:true,
    condition:'',
    profilePhoto:'',
    banner:'',
    mainPresentationOne: '',
    mainPresentationTwo: '',
    footerSectionOne: '',
    footerSectionTwo: '',
    footerLastLine: '',
    footerTitle: '',
    isOpenBusiness:false,
    instagramLink:'',
    twitterLink:'',
    facebookLink:''
};

const user = ( state = initialState, action ) => {

    switch (action.type) {
        case 'SET_USER':
            
            return action.payload;

        case 'CLEAR_USER':

            return { ...initialState, isLoading:false };

        case 'SET_PROFILE_PHOTO':

            return { ...state, profilePhoto:action.payload };

        case 'SET_BANNER':

            return { ...state, banner:action.payload };

        case 'DELETE_PROFILE_PHOTO':

            return { ...state, profilePhoto:'' };

        case 'DELETE_BANNER':

            return { ...state, banner:'' };

        case 'UPDATE_INFO':
            
            return { ...state, ...action.payload };

        case 'UPDATE_SOCIAL_MEDIA':

            return { ...state, ...action.payload };
    
        default:
            return state;
    };

};

export default user;