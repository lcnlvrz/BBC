import React, { useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import TimelineRoundedIcon from '@material-ui/icons/TimelineRounded';
import { defaultTransiton } from '../../../constants/styles';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import { useUploadRealTimeData } from '../../../hooks/useUploadRealTimeData';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';  
import { setTitle } from '../../../actions/helmetTitle';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import ButtonSaveChanges from '../../reusableComponents/ButtonSaveChanges';


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

const ClientsInTheShop = ( props ) => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { clientsInTheShopRef, input } = props;

    return (

        <div className={ `${ mobileResolution ? 'w-full' : 'w-2/4' }` }>
            <div className='flex flex-col items-center justify-center'>
                <PersonRoundedIcon style={{ fontSize:'150px' }}/>
                <h1 className='font-semibold text-3xl text-center'> 
                    Clients in the shop
                </h1>
                <input
                className='border-none text-green-400 w-full text-4xl text-center outline-none'
                ref={ clientsInTheShopRef }
                name='clientsInTheShop'
                defaultValue={ input.clientsInTheShop }
                />
            </div>
        </div>

    );

};

const PersonalWorking = ( props ) => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { personalWorkingRef, input } = props;

    return (

        <div 
        className={ `${ mobileResolution ? 'w-full' : 'w-2/4' } bg-transparent` }>
            <div className='flex flex-col items-center justify-center'>
                <WorkRoundedIcon style={{ fontSize:'150px' }}/>
                <h1 className='font-semibold text-3xl text-center'> 
                    Personal Working
                </h1>
                <input
                style={{ zIndex:'10000' }}
                ref={ personalWorkingRef }
                className='border-none text-green-400 text-4xl text-center outline-none bg-transparent w-full'
                name='personalWorking'
                defaultValue={ input.personalWorking }
                />
            </div>
        </div>

    );

};

const RealTimeData = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const personalWorkingRef = useRef( null );
    const clientsInTheShopRef = useRef( null );

    const { update, alert, isLoading, setAlert, isNewChange, setIsNewChange } = useUploadRealTimeData();

    const user = useSelector(state => state.user);

    const [input, setInput] = useState( { personalWorking:user.personalWorking, clientsInTheShop:user.clientsInTheShop } );

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( setTitle( `Business Client Connection - Real Time Data` ) );
        
    }, [ dispatch ]);

    const submitForm = ( e ) => {

        e.preventDefault();

        if ( input.personalWorking !== user.personalWorking || input.clientsInTheShop !== user.clientsInTheShop ) update( input );

    };

    const changeForm = async (e) => {

        await setInput( { ...input, [ e.target.name ]:e.target.value } );

        if ( e.target.name === 'clientsInTheShop' && e.target.value !== user.clientsInTheShop ) {
            setIsNewChange( true );

        } else if( e.target.value !== user.clientsInTheShop ){

            setIsNewChange( true );

        } else {

            setIsNewChange( false );

        };

        if ( e.target.name === 'clientsInTheShop' ) return clientsInTheShopRef.current.focus();

        personalWorkingRef.current.focus();


    };

    const propsClientsShop = { clientsInTheShopRef, input  };

    const propsPersonal = { personalWorkingRef, input };

    const DataRealTime = () => {

        return (
            <div className={ `p-5 space-y-5 ${ mobileResolution ? 'pt-28' : '' }` }>
                    <TitleSection/>
                    <form 
                    onSubmit={ (e) => submitForm(e) }
                    onChange={ (e) => changeForm(e) }
                    className={ `${ mobileResolution ? 'space-y-10 flex-col' : 'space-x-5 flex-row' } flex` }>
                        <ClientsInTheShop {...propsClientsShop}/>
                        <PersonalWorking {...propsPersonal}/>
                    { isNewChange && <ButtonSaveChanges isNewChange={ isNewChange } isLoading={ isLoading }/> }
                </form>
                { alert.type && <AlertAnimation setCloseAlert={ setAlert } { ...alert }/> }
            </div>
        );

    };

    return <DataRealTime />;

};

export default RealTimeData;
