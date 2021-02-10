
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
    facebookLink:'',
    products:[]
};

const user = ( state = initialState, action ) => {

    const copyProducts = [ ...state.products ];

    switch (action.type) {
        case 'SET_USER':
            
            return { ...initialState, ...action.payload };

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

        case 'UPLOAD_ONE_PRODUCT':

            return { ...state, products:[ action.payload, ...state.products ] };

        case 'UPDATE_INFO_PRODUCT':

            copyProducts[ action.payload.indexProduct ] = { ...copyProducts[ action.payload.indexProduct ], ...action.payload.newInfoProduct };

            return { ...state, products:copyProducts };

        case 'DELETE_PRODUCT':

            copyProducts.splice( action.payload, 1 );

            return { ...state, products:copyProducts };

        case 'UPDATE_BANNER_SECTION_PRODUCTS':

            return { ...state, bannerSectionProducts:action.payload };

        case 'DELETE_BANNER_SECTION_PRODUCTS':

            return { ...state, bannerSectionProducts:'' };
        
        default:
            return state;
    };

};

export default user;