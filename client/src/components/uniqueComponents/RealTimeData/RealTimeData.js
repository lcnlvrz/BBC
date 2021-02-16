import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import HeaderForBusiness from '../HeaderForBusiness';
import HeaderMobile from '../HeaderForBusiness/HeaderMobile/HeaderMobile';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import { defaultTransiton } from '../../../constants/styles';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import { Fade } from '@material-ui/core';
import { useUploadRealTimeData } from '../../../hooks/useUploadRealTimeData';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import { useSelector } from 'react-redux';
import PropagateLoader from "react-spinners/PropagateLoader";
import ClipLoader from "react-spinners/ClipLoader";
import { Helmet } from 'react-helmet-async';

const RealTimeData = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 500px )' });

    const personalWorkingRef = useRef( null );
    const clientsInTheShopRef = useRef( null );

    const [isEditing, setIsEditing] = useState( { personalWorking:false, clientsInTheShop:false } );

    const { setData, cancelToken, alert, isLoading, setAlert } = useUploadRealTimeData();
 
    const items = [ { title:'Personal Working Now', icon:WorkRoundedIcon, ref:personalWorkingRef, id:'personalWorking' }, { title:'Clients in the shop Now:', icon:PeopleAltRoundedIcon, ref:clientsInTheShopRef, id:'clientsInTheShop' } ];

    const user = useSelector(state => state.user);

    const [input, setInput] = useState( { personalWorking:user.personalWorking, clientsInTheShop:user.clientsInTheShop } );

    useEffect(() => {

        return () => {

            if ( cancelToken ) cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    const DataRealTime = () => {

        return (
            <Fade in={true}>
                <div className={ `p-5 space-y-5 ${ mobileResolution ? 'pt-28' : '' }` }>
                    <Helmet>
                        <title> Business Client Connection - Real Time Data </title>
                    </Helmet>
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

                    <div 
                    className={ `all__items ${ mobileResolution && 'space-y-5' } flex flex-row flex-wrap items-center justify-evenly` }>
                        { items.map( ( item, index ) => (
                            <div 
                            key={ index }
                            className='flex flex-col items-center justify-center w-72'>
                                <item.icon
                                style={{ fontSize:'100px' }}
                                />
                                <div className='flex flex-col items-center justify-center'>
                                    <h2 className='font-semibold'> 
                                        { item.title } 
                                    </h2>
                                    <div className='flex flex-row items-center justify-center space-x-5'>
                                        <IconButton
                                        disabled
                                        className='opacity-0'
                                        >
                                            <EditRoundedIcon
                                            style={ defaultTransiton }
                                            className='text-black hover:text-green-400'
                                            />
                                        </IconButton>
                                        <form
                                        onChange={ async (e) => {

                                            await setInput( { ...input, [ e.target.name ]:e.target.value } );

                                            item.ref.current.focus();

                                        } }
                                        className='flex flex-row items-center justify-center space-x-5'
                                        onSubmit={ async (e) => {

                                            e.preventDefault();

                                            await setIsEditing( { ...isEditing, [ item.id ]:false } );

                                            item.ref.current.blur();

                                            if ( input[ item.id ] !== user[ item.id ] ) setData( { ...input, fieldChanged:item.id } );

                                        } }
                                        >
                                            <input
                                            required
                                            name={ item.id }
                                            onClick={ () => {

                                                console.log( 'xd' );
                                                item.ref.current.blur();

                                            } }
                                            ref={ item.ref }
                                            className='text-center outline-none text-5xl text-green-400 w-2/4'
                                            defaultValue={ input[ [ item.id ] ] }
                                            />
                                            { isEditing[ item.id ] && !isLoading
                                            ?
                                            <IconButton
                                            type='submit'
                                            style={{ outline:'none' }}
                                            className='hover:text-red-500'>
                                                <CheckRoundedIcon
                                                
                                                style={ defaultTransiton }
                                                className='text-black hover:text-green-400'
                                                />
                                            </IconButton>
                                            :
                                            isEditing[ item.id ] && isLoading
                                            ?
                                            <ClipLoader size='25px'/>
                                            :
                                            <IconButton
                                            style={{ outline:'none' }}
                                            onClick={ async () => {

                                                await setIsEditing( { ...isEditing, [ item.id ]:true } );

                                                item.ref.current.focus();

                                            } }
                                            className='hover:text-red-500'>
                                                <EditRoundedIcon
                                                style={ defaultTransiton }
                                                className='text-black hover:text-green-400'
                                                />
                                            </IconButton>
                                            }
                                        </form>
                                    </div>
                                </div>
                            </div>  
                        ) ) }
                    </div>
                    { 
                        alert.type && 
                        <AlertAnimation
                        severity={ alert.severity } 
                        setCloseAlert={ setAlert } 
                        message={ alert.message }/> 
                    }
                </div>
            </Fade>
        );

    };

    return <DataRealTime/>;

};

export default RealTimeData;
