import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import PublicRoundedIcon from '@material-ui/icons/PublicRounded';
import LiveChat from '../components/uniqueComponents/LiveChat';
import AddProduct from '../components/uniqueComponents/AddProduct';
import RealTimeData from '../components/uniqueComponents/RealTimeData/RealTimeData';
import BusinessProfile from '../components/uniqueComponents/BusinessProfile';
import Products from '../components/uniqueComponents/Products';
import Panel from '../components/uniqueComponents/Panel/Panel';
import AirMaxRed from '../images/AirMaxRed.jpg';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import ImageRoundedIcon from '@material-ui/icons/ImageRounded';
import ContactSupportRoundedIcon from '@material-ui/icons/ContactSupportRounded';
import BorderBottomRoundedIcon from '@material-ui/icons/BorderBottomRounded';
import TimerRoundedIcon from '@material-ui/icons/TimerRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import QueryBuilderRoundedIcon from '@material-ui/icons/QueryBuilderRounded';
import PublishRoundedIcon from '@material-ui/icons/PublishRounded';
import moment from 'moment';
import TitleRoundedIcon from '@material-ui/icons/TitleRounded';
import SubtitlesRoundedIcon from '@material-ui/icons/SubtitlesRounded';
import AttachMoneyRoundedIcon from '@material-ui/icons/AttachMoneyRounded';
import FormatListNumberedRoundedIcon from '@material-ui/icons/FormatListNumberedRounded';

export const groupOfInputsThirdStepSignUp = ( input, businessName, username, password, repeatPassword ) => {

    const inputsArray = [ 
        
        { maxLength:100, startIcon:BusinessRoundedIcon, refInput:businessName, type:'text', required:true, label:'Business Name', value:input.businessName, name:'businessName', color:'#000000', isFullWidth:true, variant:'outlined'  }
        , 
        { maxLength:100, startIcon:AccountCircleRoundedIcon, refInput:username, type:'text', required:true, label:'Username', value:input.username, name:'username', color:'#000000', isFullWidth:true, variant:'outlined', conditions:'Only letters, numbers . and _'}
        , 
        
        { maxLength:100, startIcon:LockRoundedIcon, refInput:password, type:'password', required:true, label:'Password', value:input.password, name:'password', color:'#000000', isFullWidth:true, variant:'outlined', isPassword:true, conditions:'Minimum 1 upper case, 1 lower, 1 digit, 1 special character and 8 length' }, 

        { maxLength:100, startIcon:LockRoundedIcon, refInput:repeatPassword, type:'password', required:true, label:'Repeat Password', value:input.repeatPassword, name:'repeatPassword', color:'#000000', isFullWidth:true, variant:'outlined', isPassword:true, conditions:'Passwords needs be equal' } 

    ];

    return inputsArray;

};



export const optionsLeftMenu = [ { title:'Home', Icon:HomeRoundedIcon, route:'/business/?section=panel' }, { title:'Real-Time Data', Icon:TimelineRoundedIcon, route:'/business/?section=real-time-data' },{ title:'Business Profile', Icon:BusinessRoundedIcon, route:'/business/?section=business-profile' }, { title:'Products', Icon:ShoppingBasketRoundedIcon, route:'/business/?section=products' }, { title:'Add Product', Icon:AddCircleRoundedIcon, route:'/business/?section=add-product' }, { title:'Live Chat', Icon:MessageRoundedIcon, route:'/business/?section=live-chat' }, { title:'Public Profile', Icon:PublicRoundedIcon, route:'variable' }, { title:'Logout', Icon:MeetingRoomRoundedIcon, route:'/' } ];

export const socialsMedia = [ { icon:FacebookIcon, id:'facebook'}, { icon:InstagramIcon, id:'instagram' }, { icon:TwitterIcon, id:'twitter' } ];



export const textAreaBusinessProfileContentFooterFunction = ( input ) => {

    return [ { name:'footerSectionOne', placeholder:'Type something important', value:input.footerSectionOne }, { name:'footerSectionTwo', placeholder:"More information about what's your business do", value:input.footerSectionTwo } ];

};

export const textAreaBusinessProfileContentMainFunction = ( input ) => {

    return [ { name:'mainPresentationOne', placeholder:'Tell us about your bussiness 🤔', value:input.mainPresentationOne, className:'outline-none w-full text-center border rounded-2xl p-5 text-semibold text-2xl resize-none' }, { name:'mainPresentationTwo', placeholder:'More presentation...', value:input.mainPresentationTwo, className:'outline-none w-full text-center border rounded-2xl p-5 text-semibold text-2xl resize-none' } ];

};

export const inputKeys = [ 'businessName', 'isOpenBusiness', 'mainPresentationOne', 'footerSectionTwo', 'footerTitle', 'footerSectionOne', 'mainPresentationTwo', 'footerLastLine', 'since', 'until', 'businessCategory', 'location' ];


export const initialStateInputAddProduct = { title:'', subtitle:'', price:'', description:'', details:'', category:'', stock:'', currency:'', image:''};


export const sections = [ { title:'live-chat', component:LiveChat }, { title:'add-product', component:AddProduct }, { title:'real-time-data', component:RealTimeData }, { title:'business-profile', component:BusinessProfile }, { title:'products', component:Products }, { title:'panel', component:Panel } ];

export const titleSections = [ 'live-chat',
'add-product',
'real-time-data',
'business-profile',
'products',
'panel' ];


export const messagesChatHomePage = [ 

    { isOtherMessage:true, content:{ profilePhoto:'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg', name:'Richard Vaughan', message:'Hi Nike, i have a problem. Can you solve this?', timeAgo:'five minutes ago' } }, 

    { isOwnMessage:true, content:{ profilePhoto:'https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg', 
    name:'Nike', 
    message:'Hi Richard. For sure we can. Tell us about your problem', 
    timeAgo:'three minutes ago' } }, 

    { isOtherMessage:true, content:{ profilePhoto:'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg', name:'Richard Vaughan', timeAgo:'two minutes ago', image:AirMaxRed, isMedia:true } }, 

    { isOtherMessage:true, content:{ profilePhoto:'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg', name:'Richard Vaughan', message:'My shoes was delivered in wrong size. My size is 11, not 9. Can you change it for another right?', timeAgo:'two minutes ago' } }, 

    { isOwnMessage:true, content:{ profilePhoto:'https://i.pinimg.com/originals/4d/96/2d/4d962dee72fa76f023d411e20d30690c.jpg', 
    name:'Nike', 
    message:"Sorry about that mistake. No problem, come to our location. We'll wait for you and change it.", 
    timeAgo:'a minute ago' } }, 

    { isOtherMessage:true, content:{ profilePhoto:'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg', name:'Richard Vaughan', message:"That's why i love you guys. I'll see you later. Thanks ❤️", timeAgo:'a few seconds ago ' } } 
];


export const productTextExampleHomePage = [ "In 2016, Nike released a new and improved version of the famous “Back to the Future” shoe. Each pair advanced Adaptive Fit technology, also known as “power laces,” which can sense the wearer's motion and loosen or tighten accordingly.", "In 2016, Nike released a new and improved version of the famous “Back to the Future” shoe. Each pair advanced Adaptive Fit technology, also known as “power laces,” which can sense the wearer's motion and loosen or tighten accordingly.", "DATAA" ];


export const advantagesHome = [{ title:'IMPROVE YOUR CONVERSION RATIO', bgColor:'bg-gray-200', textColor:'text-black', text:'Target users to your business profile and increase the conversion ratio', icon:'trendingUp' }, 
{ title:'CLOSE THE SELL EASILY', bgColor:'bg-gray-300', textColor:'text-black', icon:'happyFace', text:'In your business profile there are only essential information. No more repeat the same thing every time' }
,{ title:'100% CONTROL', bgColor:'bg-gray-400', textColor:'text-black', icon:'control', text:'With the admin panel you can manage all of your business. Zero regulation.' }];


export const footerContent = [ 

    { title:'About Us', text:'Business Client Connection is a free web application useful to service as landing page or presentation letter to business. With our platform you can create a business profile, showing to the clients/potential clients what does your business do, presentation, advantages, location, schedule, products/services and more essential information. Besides, we have our major feature which is live chat. ' }, 
    { title:'Our Mision', text:'This application was created with the only purpose to help small - medium business to improve their conversion ratio offering a business profile where clients can arrive and interact.'}, 
    { title:'Origin', text:"BCC was created mainly for two reasons. First because most of the small-medium business don't have enough money to develop an web application. Second reason because usually social media like  instagram is a little limited and don't allow business to presentate their business well. This application was made only for business and more focus on retail." },
    { title:'The creator', text:'This application was programmed by Luciano Alvarez, a young argentinian programmer who lives in Tucuman, Argentina and loves develop solutions.' } 

];

export const returnAdminPanelSections = ( user, lastUpdateRealTime ) => {

    return [ { title:'Real-Time Data',

    items:[ { title:'Personal Working now', value:user.personalWorking ? user.personalWorking : 0, icon:WorkRoundedIcon }, { title:'Clients in the shop', value:user.clientsInTheShop ? user.clientsInTheShop : 0, icon:PeopleAltRoundedIcon }, 
    { title:'Last update', value:lastUpdateRealTime, icon:TimerRoundedIcon } ], 
    
    icon:TimelineRoundedIcon, route:'/business/?section=real-time-data' }, 
    { title:'Business Profile', icon:BusinessRoundedIcon, 
    
    items:[ { title:'Banner', value:user.banner ? true : false, icon:ImageRoundedIcon }, { title:'Presentation', value:user.mainPresentationOne && user.mainPresentationTwo ? true : false, icon:ContactSupportRoundedIcon }, { title:'Profile Photo', value:user.profilePhoto ? true : false, icon:AccountCircleRoundedIcon }, { title:'Presentation', value:user.mainPresentationOne && user.mainPresentationTwo ? true : false, icon:ContactSupportRoundedIcon } ,{ title:'Business Category', value:user.businessCategory ? true : false, icon:CategoryRoundedIcon }, { title:'Location', value:user.location ? true : false, icon:LocationOnRoundedIcon }, { title:'Shedule', value:user.since && user.until ? true : false, icon:QueryBuilderRoundedIcon }, { title:'Footer', icon:BorderBottomRoundedIcon , value:user.footerTitle && user.footerSectionOne && user.footerSectionTwo && user.footerLastLine ? true : false }, { title:'Social Media', icon:InstagramIcon, value:user.facebookLink && user.instagramLink && user.twitterLink ? true : false } ], 
    
    route:'/business/?section=business-profile' }, { title:'Products', icon:ShoppingBasketRoundedIcon, 
    
    items:[ { title:'Quantity published', value:user.products && user.products.length && user.products.length === 10 ? '+10' : user.products.length, icon:PublishRoundedIcon },{ title:'Last published', value:user.products.length > 0 ? moment( moment.unix( user.products[0].createdAt ).format() ).fromNow() : 'Never', icon:TimerRoundedIcon }, { title:'Banner Products', value:user.bannerSectionProducts ? true : false, icon:ImageRoundedIcon } ],
    
    route:'/business/?section=products' } ];

};


export const returnInputPropsAddProducts = (input) => {

    return [ { maxLenght:200 , value:input.title , StartIcon:TitleRoundedIcon, name:'title', label:'Title'}, { maxLenght:200 , value:input.subtitle, StartIcon:SubtitlesRoundedIcon, name:'subtitle', label:'Subtitle'}, { maxLenght:100, value:input.price, StartIcon:AttachMoneyRoundedIcon, name:'price', label:'Price'}, { maxLenght:500, value:input.category, StartIcon:CategoryRoundedIcon, name:'category', label:'Category'}, { maxLenght:500, value:input.stock, StartIcon:FormatListNumberedRoundedIcon, name:'stock', label:'Stock'} ];

};

export const returnDefaultInputPropsAddProduct = ( productRef, alert ) => {

    return {

        required:true,
        isFullWidth:true,
        alert,
        type:'text',
        color:'#000000',
        variant:'outlined',
        refInput:productRef

    };

};
