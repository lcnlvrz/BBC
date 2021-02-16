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
import { useSelector } from 'react-redux';
import LiveChat from '../components/uniqueComponents/LiveChat';
import AddProduct from '../components/uniqueComponents/AddProduct';
import RealTimeData from '../components/uniqueComponents/RealTimeData/RealTimeData';
import BusinessProfile from '../components/uniqueComponents/BusinessProfile';
import Products from '../components/uniqueComponents/Products';
import Panel from '../components/uniqueComponents/Panel/Panel';
import AirMaxRed from '../images/AirMaxRed.jpg';

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

    return [ { name:'mainPresentationOne', placeholder:'Tell us about your bussiness 🤔', value:input.mainPresentationOne }, { name:'mainPresentationTwo', placeholder:'More presentation...', value:input.mainPresentationTwo } ];

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

    { isOtherMessage:true, content:{ profilePhoto:'https://t4.ftcdn.net/jpg/02/14/74/61/360_F_214746128_31JkeaP6rU0NzzzdFC4khGkmqc8noe6h.jpg', name:'Richard Vaughan', message:"That's why i love you guys. I'll see you later. Thanks ❤️", timeAgo:'a few seconds ago ' } } ]