import React, { useState, useEffect } from 'react'
import '../MyBusiness/MyBusiness.css';
import Badge from '@material-ui/core/Badge';
import { Avatar, Fade, IconButton, InputBase, TextareaAutosize } from '@material-ui/core';
import { defaultTransiton, fillButton, textAreaDefaultProps } from '../../../constants/styles';
import ChangeProfilePhoto from './ChangeProfilePhoto/ChangeProfilePhoto';
import ChangeSocialMediaLinks from './ChangeSocialMediaLinks';
import { useSelector } from 'react-redux';
import BannerDefault from '../../../images/bannerDefault.png';
import { useUploadInformation } from '../../../hooks/useUploadInformation';
import AlertAnimation from '../../reusableComponents/AlertAnimation';
import PropagateLoader from "react-spinners/PropagateLoader";
import { socialsMedia, textAreaBusinessProfileContentFooterFunction, textAreaBusinessProfileContentMainFunction, inputKeys } from '../../../constants/content';
import Banner from './Banner';
import CloseBusiness from './CloseBusiness';
import Footer from './Footer';
import ButtonSaveChanges from '../../reusableComponents/ButtonSaveChanges';
import BannerSectionProducts from './BannerSectionProducts';
import LocationAndSchedule from './LocationAndSchedule';
import { Link } from 'react-router-dom';
import WorkRoundedIcon from '@material-ui/icons/WorkRounded';
import { useMediaQuery } from 'react-responsive';
import { Helmet } from 'react-helmet-async';

const BusinessProfile = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const user = useSelector(state => state.user);

    const { setInputData, alert, setAlert, cancelToken, isLoading } = useUploadInformation();

    const [input, setInput] = useState( { businessName:'', isOpenBusiness:false, mainPresentationOne:'', footerSectionTwo:'', footerTitle:'', footerSectionOne:'', mainPresentationTwo:'', footerLastLine:'', businessCategory:'', since:'', until:'', location:'' } );

    const [socialMediaLinks, setSocialMediaLinks] = useState( { facebook:null, instagram:null, twitter:null } );

    const [isChangePhoto, setIsChangePhoto] = useState( false );

    const [isChangeSocialMediaLinks, setIsChangeSocialMediaLinks] = useState( false );

    const [isNewChange, setIsNewChange] = useState( false );

    useEffect(() => {

      if ( !user.isLoading ) {

        for (let i = 0; i < inputKeys.length; i++) {

          const field = inputKeys[ i ];

          setInput( name => ({ ...name, [field]: field === 'isOpenBusiness' ? user[ field ] :  user[ field ] ? user[ field ] : '' }) );
          
        };

        const socialMediaValues = { facebook:user.facebookLink, twitter:user.twitterLink, instagram:user.instagramLink };

        setSocialMediaLinks( socialMediaValues );

      };
     
    }, [ user ]);

    useEffect(() => {

      return () => {

        if ( cancelToken ) return cancelToken.cancel();

      };

    }, [ cancelToken ]);

    const textAreaBusinessProfileContentMain = textAreaBusinessProfileContentMainFunction( input );

    return (
        <Fade in={ true }>
          <div className={ mobileResolution ? 'pt-28' : '' }>
            <Helmet>
              <title> Business Client Connection - Business Profile </title>
            </Helmet>
            <form
            onSubmit={ (e) => {
              e.preventDefault();
              setInputData( input );
            } }
            onChange={ (e) => {

              setIsNewChange( true );

              if ( e.target.name === 'isOpenBusiness' ) return setInput( { ...input, [ e.target.name ]:e.target.checked } );

              setInput( { ...input, [ e.target.name ]: e.target.value } ); 

            } }
            >
                <Banner 
                input={ input } 
                setIsChangePhoto={ setIsChangePhoto } 
                setIsNewChange={  setIsNewChange}/>
                <div className='mt-28 flex items-center justify-center flex-col space-y-5'>
                  <div className='flex flex-row space-x-2 items-center mx-10'>
                    <label> 
                      Business's category: 
                    </label> 
                    <InputBase
                    className='p-0'
                    required
                    inputProps={{ style:{ padding:'0px', fontWeight:600, marginTop:'2px', textAlign:'center' } }}
                    name='businessCategory'
                    value={ input.businessCategory ? input.businessCategory : '' }
                    placeholder='BarberShop, Shoes Store...'
                    />
                  </div>
                  <CloseBusiness input={ input } setIsNewChange={ setIsNewChange }/>
                  <div className='mt-28 flex flex-row flex-wrap justify-evenly m-10 w-full px-5 space-y-5'>
                    { textAreaBusinessProfileContentMain.map( ( textArea ) => (

                      <TextareaAutosize
                      key={ textArea.name }
                      name={ textArea.name }
                      { ...textAreaDefaultProps }
                      className='outline-none w-full text-center border rounded-2xl p-5 text-semibold text-2xl resize-none'
                      placeholder={ textArea.placeholder }
                      defaultValue={ textArea.value }
                      />

                    ) ) }
                  </div>

                  <LocationAndSchedule
                  until={ input.until } 
                  since={ input.since }
                  setInput={ setInput } 
                  location={ input.location }/>

                  <Footer 
                  setIsNewChange={ setIsNewChange } 
                  input={ input } 
                  setIsChangeSocialMediaLinks={ setIsChangeSocialMediaLinks } 
                  socialMediaLinks={ socialMediaLinks }/>

                  { isNewChange 
                  && 
                  <ButtonSaveChanges isNewChange={ isNewChange } isLoading={ isLoading }/>
                  }

                </div>
                { 
                  isChangePhoto 
                  && 
                  <ChangeProfilePhoto 
                  setCloseModal={ setIsChangePhoto }
                  endPointDelete={ isChangePhoto.endPointDelete }
                  endPoint={ isChangePhoto.endPoint }
                  />  
                }

              </form>
              { isChangeSocialMediaLinks 
              && 
              <ChangeSocialMediaLinks
              setCloseModal={ setIsChangeSocialMediaLinks }/> }

              { alert.type 
              && 
              <AlertAnimation 
              severity={ alert.severity } 
              message={ alert.message } 
              setCloseAlert={ setAlert }/> 
              }
          </div>
        </Fade>
    );
};

export default BusinessProfile;
