import React, { useRef, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import { defaultTransiton } from '../../../constants/styles';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import { useUploadRealTimeData } from '../../../hooks/useUploadRealTimeData';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import OneField from './OneField';


const TitleSection = () => {

    return (
        <div 
        style={ defaultTransiton }
        className='flex flex-row justify-center items-center space-x-5 bg-black text-white rounded-2xl cursor-pointer p-5 hover:bg-white hover:text-black'>
            <TimelineRoundedIcon
            style={{ fontSize:'80px' }}
            />
            <h1 className='text-4xl text-center'> 
                Real-Time Data 
            </h1>
        </div>

    );

};

const Items = ( props ) => {

    const { mobileResolution, items, setIsEditing, setInput, isEditing, input, user, update, isLoading } = props;

    return (

        <div 
        className={ `all__items ${ mobileResolution && 'space-y-5' } flex flex-row flex-wrap items-center justify-evenly` }>
            { items.map( ( item, index ) => {

                const props = { item, setIsEditing, setInput, isEditing, input, user, update, isLoading, key:index };

                return <OneField  { ...props }/>

            } ) }
        </div>

    );

};

const RealTimeData = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 500px )' });

    const personalWorkingRef = useRef( null );
    const clientsInTheShopRef = useRef( null );

    const [isEditing, setIsEditing] = useState( { personalWorking:false, clientsInTheShop:false } );

    const { update, alert, isLoading, setAlert } = useUploadRealTimeData();
 
    const items = [ { title:'Personal Working Now', icon:WorkRoundedIcon, ref:personalWorkingRef, id:'personalWorking' }, { title:'Clients in the shop Now:', icon:PeopleAltRoundedIcon, ref:clientsInTheShopRef, id:'clientsInTheShop' } ];

    const user = useSelector(state => state.user);

    const [input, setInput] = useState( { personalWorking:user.personalWorking, clientsInTheShop:user.clientsInTheShop } );

    const propsItems = { mobileResolution, items, setIsEditing, setInput, isEditing, input, user, update, isLoading };


    const DataRealTime = () => {

        return (
            <div className={ `p-5 space-y-5 ${ mobileResolution ? 'pt-28' : '' }` }>
                <Helmet>
                    <title> Business Client Connection - Real Time Data </title>
                </Helmet>
                <TitleSection/>
                <Items {...propsItems}/>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } { ...alert }/> }
            </div>
        );

    };

    return <DataRealTime />;

};

export default RealTimeData;
