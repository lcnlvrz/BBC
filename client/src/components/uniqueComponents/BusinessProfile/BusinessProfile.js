import React, { useState, useEffect } from 'react'
import '../MyBusiness/MyBusiness.css';
import Badge from '@material-ui/core/Badge';
import { Avatar, Fade, InputBase, TextareaAutosize } from '@material-ui/core';
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
import LocationOnRoundedIcon from '@material-ui/icons/LocationOnRounded';
import WatchLaterRoundedIcon from '@material-ui/icons/WatchLaterRounded';
import AddPhotoAlternateRoundedIcon from '@material-ui/icons/AddPhotoAlternateRounded';

const BusinessProfile = () => {

    const user = useSelector(state => state.user);

    const { setInputData, alert, setAlert, cancelToken, isLoading } = useUploadInformation();

    const [input, setInput] = useState( { businessName:'', isOpenBusiness:false, mainPresentationOne:'', footerSectionTwo:'', footerTitle:'', footerSectionOne:'', mainPresentationTwo:'', footerLastLine:'' } );


    const [socialMediaLinks, setSocialMediaLinks] = useState( { facebook:null, instagram:null, twitter:null } );

    const [isChangePhoto, setIsChangePhoto] = useState( false );

    const [isChangeSocialMediaLinks, setIsChangeSocialMediaLinks] = useState( false );

    const [isNewChange, setIsNewChange] = useState( false );

    useEffect(() => {

      if ( !user.isLoading ) {

        for (let i = 0; i < inputKeys.length; i++) {

          const field = inputKeys[ i ];
          
          setInput( name => ({ ...name, [field]: user[ field ] }) );
          
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


    const textAreaBusinessProfileContentFooter = textAreaBusinessProfileContentFooterFunction( input );

    const textAreaBusinessProfileContentMain = textAreaBusinessProfileContentMainFunction( input );

    return (
        <Fade in={ true }>
          <div>
            <form
            onSubmit={ (e) => {
              e.preventDefault();
              setInputData( input );
            } }
            onChange={ (e) => {

              if ( e.target.name === 'isOpenBusiness' ) return setInput( { ...input, [ e.target.name ]:e.target.checked } );

              setInput( { ...input, [ e.target.name ]: e.target.value } ); 

            } }
            >
                <Banner input={ input } setIsChangePhoto={ setIsChangePhoto } setIsNewChange={  setIsNewChange}/>
                <div className='mt-28 flex items-center justify-center flex-col space-y-5'>
                  <div className='flex flex-row space-x-2 items-center'>
                    <label> 
                      Business's category: 
                    </label> 
                    <InputBase
                    className='p-0'
                    required
                    inputProps={{ style:{ padding:'0px' } }}
                    name='businessCategory'
                    value={ input.businessCategory }
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
                      onChange={ () => setIsNewChange( true ) }
                      defaultValue={ textArea.value }
                      />

                    ) ) }
                  </div>
                  <div className='flex flex-row space-x-2 items-center'>
                      <LocationOnRoundedIcon 
                      style={{ fontSize:'50px' }}
                      className='text-red-500'/>
                      <InputBase
                      required
                      className='p-0'
                      name='location'
                      value={ input.location }
                      placeholder="The business's location"
                      />
                  </div>
                  <div className='flex flex-row space-x-2 items-center'>
                      <WatchLaterRoundedIcon 
                      style={{ fontSize:'50px' }}
                      className='text-black'/>
                      <InputBase
                      required
                      className='p-0'
                      name='schedule'
                      value={ input.schedule }
                      placeholder="The business's schedule"
                      />
                  </div>
                  <div 
                  style={ user.bannerSectionProducts ? { background:`url( ${ user.bannerSectionProducts } )`, backgroundSize:'100%' } : { margin:0 } }
                  className='h-60 bg-green-400 w-full flex items-center justify-center'>
                    <label 
                    style={ defaultTransiton }
                    onClick={ () => setIsChangePhoto( { endPoint:'/banner-section', endPointDelete:'/delete-bannerSection' } ) }
                    className='flex flex-row space-x-2 items-center cursor-pointer text-gray-500 hover:text-black'>
                      <AddPhotoAlternateRoundedIcon style={{ fontSize:'50px' }}/>
                      <h1 className='text-3xl font-semibold'> 
                        Banner Section Products
                      </h1>
                    </label>
                  </div>
                  <Footer setIsNewChange={ setIsNewChange } input={ input } setIsChangeSocialMediaLinks={ setIsChangeSocialMediaLinks } socialMediaLinks={ socialMediaLinks }/>

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
