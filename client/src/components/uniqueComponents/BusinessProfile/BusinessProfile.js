import React, { useState, useEffect } from 'react'
import '../MyBusiness/MyBusiness.css';
import { Fade, InputBase, TextareaAutosize } from '@material-ui/core';
import { textAreaDefaultProps } from '../../../constants/styles';
import ChangeProfilePhoto from './ChangeProfilePhoto/ChangeProfilePhoto';
import ChangeSocialMediaLinks from './ChangeSocialMediaLinks';
import { useUploadInformation } from '../../../hooks/useUploadInformation';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import Banner from './Banner';
import CloseBusiness from './CloseBusiness';
import Footer from './Footer';
import ButtonSaveChanges from '../../reusableComponents/ButtonSaveChanges';
import LocationAndSchedule from './LocationAndSchedule';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';  
import { setTitle } from '../../../actions/helmetTitle';



const TextAreaPresentation = ( props ) => {

  const { textAreaBusinessProfileContentMain } = props;

  return (

    <div className='mt-28 flex flex-row flex-wrap justify-evenly m-10 w-full px-5 space-y-5'>
        { textAreaBusinessProfileContentMain.map( ( textArea ) => {
          
          const props = { ...textAreaDefaultProps, ...textArea, key:textArea.name };

          return <TextareaAutosize { ...props }/>

        } ) }
    </div>

  );

};

const BusinessCategory = ( props ) => {

  const { inputBaseProps } = props;

  return (

    <div className='flex flex-row space-x-2 items-center mx-10'>
          <label> Business's category: </label> 
          <InputBase { ...inputBaseProps }/>
    </div>

  );

};

const BusinessProfile = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { uploadBusinessInformation, alert, setAlert, isNewChange, setIsNewChange, onChangeForm, input, setInput, socialMediaLinks, textAreaBusinessProfileContentMain, isLoading } = useUploadInformation();

    const [isChangePhoto, setIsChangePhoto] = useState( { endPoint:'', endPointDelete:'' } );

    const [isChangeSocialMediaLinks, setIsChangeSocialMediaLinks] = useState( false );

    const { until, since, location } = input;

    const propsLocationAndSchedule = { until, since, setInput, location };

    const footerProps = {setIsNewChange, input, setIsChangeSocialMediaLinks,  socialMediaLinks};

    const buttonSaveChangesProps = { setCloseModal:setIsChangePhoto, ...isChangePhoto, isNewChange, isLoading };

    const changePhotoProps = { setCloseModal:setIsChangePhoto, ...isChangePhoto };

    const inputBaseProps = { 
      className:'p-0', 
      required:true, 
      inputProps:{ style: { padding:'0px', fontWeight:600, marginTop:'2px', textAlign:'center' }},
      name:'businessCategory',
      value:input.businessCategory ? input.businessCategory : '',
      placeholder:'BarberShop, Shoes Store...' 
    };

    const propsBanner = { input, setIsChangePhoto, setIsNewChange };

    const classesContainerContentExceptBanner = 'mt-28 flex items-center justify-center flex-col space-y-5';

    const dispatch = useDispatch();

    useEffect(() => {

        dispatch( setTitle( `Business Client Connection - Real Time Data` ) );
        
    }, [ dispatch ]);

    return (
      <Fade in>
        <div className={ mobileResolution ? 'pt-28' : '' }>
          <form
          onSubmit={ (e) => uploadBusinessInformation( input, e ) }
          onChange={ (e) => onChangeForm( e ) }
          >
            <Banner { ...propsBanner }/>
            <div className={ classesContainerContentExceptBanner }>
              <BusinessCategory inputBaseProps={ inputBaseProps }/>
              <CloseBusiness input={ input } setIsNewChange={ setIsNewChange }/>
              <TextAreaPresentation textAreaBusinessProfileContentMain={ textAreaBusinessProfileContentMain }/>
              <LocationAndSchedule {...propsLocationAndSchedule}/>
              <Footer { ...footerProps }/>
              { isNewChange && <ButtonSaveChanges {...buttonSaveChangesProps }/> }
            </div>
          </form>

          { (isChangePhoto.endPoint || isChangePhoto.endPointDelete) && 
          <ChangeProfilePhoto { ...changePhotoProps }/> }

          { isChangeSocialMediaLinks && <ChangeSocialMediaLinks
          setCloseModal={ setIsChangeSocialMediaLinks }/> }

          { alert.type && <AlertAnimation { ...alert } setCloseAlert={ setAlert }/> }
        </div>
      </Fade>
    );
};

export default BusinessProfile;
