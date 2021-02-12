
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
    products:[],
    bannerSectionProductsText:'',
    location:'',
    since:'',
    until:'',
    personalWorking:0,
    clientsInTheShop:0,
    lastUpdatePersonalWorking:0,
    lastUpdateClientsInTheShop:0
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

            if ( copyProducts.length === 10 ) {

                copyProducts.pop();
                copyProducts.unshift( action.payload );
                return { ...state, products:copyProducts };

            } else {

                return { ...state, products:[ action.payload, ...state.products ] };

            };

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

        case 'UPDATE_SECTION_PRODUCTS_TEXT':

            return { ...state, bannerSectionProductsText:action.payload };

        case 'UPDATE_REAL_TIME_DATA':

            return { ...state, ...action.payload };

        
        default:
            return state;
    };

};

export default user;