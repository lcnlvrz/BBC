import BusinessRoundedIcon from '@material-ui/icons/BusinessRounded';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import LockRoundedIcon from '@material-ui/icons/LockRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import MessageRoundedIcon from '@material-ui/icons/MessageRounded';
import MeetingRoomRoundedIcon from '@material-ui/icons/MeetingRoomRounded';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import ShoppingBasketRoundedIcon from '@material-ui/icons/ShoppingBasketRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';

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


export const optionsLeftMenu = [ { title:'Home', Icon:HomeRoundedIcon, route:'/business/?section=panel' }, { title:'Real-Time Data', Icon:TimelineRoundedIcon, route:'/business/?section=real-time-data' },{ title:'Business Profile', Icon:BusinessRoundedIcon, route:'/business/?section=business-profile' }, { title:'Products', Icon:ShoppingBasketRoundedIcon, route:'/business/?section=products' }, { title:'Add Product', Icon:AddCircleRoundedIcon, route:'/business/?section=add-product' }, { title:'Live Chat', Icon:MessageRoundedIcon, route:'/business/?section=live-chat' }, { title:'Logout', Icon:MeetingRoomRoundedIcon, route:'/' } ];

