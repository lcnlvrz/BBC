import React, { useState, useRef, useEffect } from 'react'
import ModalOptions from '../../../reusableComponents/Modal';
import { useMediaQuery } from 'react-responsive';
import { defaultTransiton, outlineButton } from '../../../../constants/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import VisibilityOffRoundedIcon from '@material-ui/icons/VisibilityOffRounded';
import { IconButton, InputBase } from '@material-ui/core';
import VisibilityRoundedIcon from '@material-ui/icons/VisibilityRounded';
import validator from 'validator';
import { useUploadSocialMedia } from '../../../../hooks/useUploadSocialMedia';
import PropagateLoader from "react-spinners/PropagateLoader";
import AlertAnimation from '../../../reusableComponents/AlertAnimation';
import { useDispatch, useSelector } from 'react-redux';
import { socialsMedia } from '../../../../constants/content';

const ChangeSocialMediaLinks = ( props ) => {

    const { setCloseModal } = props;

    const { setData, isLoading, setAlert, cancelToken, alert } = useUploadSocialMedia();

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const [input, setInput] = useState( { facebookLink:'https://facebook.com/', twitterLink:'https://twitter.com/', instagramLink:'https://instagram.com/' } );

    const [disable, setDisable] = useState( { facebook:false, instagram:false, twitter:false } );

    const user = useSelector(state => state.user);
    
    useEffect(() => {

        return () => {

            if ( cancelToken ) return cancelToken.cancel();

        };
        
    }, [ cancelToken ]);

    useEffect(() => {

        const businessLinks = { instagram:user.instagramLink, facebook:user.facebookLink, twitter:user.twitterLink };

        const businessLinksObject = Object.keys( businessLinks );

        for (let i = 0; i < businessLinksObject.length; i++) {

            const socialMediaValue = businessLinks[ businessLinksObject[ i ] ];
            
            if ( !socialMediaValue ) {

                setDisable( d => ({ ...d, [ `${ businessLinksObject[i] }` ]:true }) );
                setInput( socialMedias => ({ ...socialMedias, [ `${ businessLinksObject[i] }Link` ]:'' }) );

            } else {

                setInput( socialMedias => ({ ...socialMedias, [ `${ businessLinksObject[i] }Link` ]:socialMediaValue }) );
            };
            
        };

    }, [ user ]);
 
    return (
        <ModalOptions setCloseModal={ setCloseModal }>
                <form 
                onSubmit={ (e) => {

                    e.preventDefault();

                    setData( input );

    
                } }
                onChange={ (e) => {

                    const validation = validator.isURL( e.target.value );

                    if ( !validation && e.target.name === 'facebookLink' ) return setInput( { ...input, [ e.target.name ]:`https://facebook.com/${ e.target.value }` } );

                    if ( !validation && e.target.name === 'twitterLink' ) return setInput( { ...input, [ e.target.name ]:`https://twitter.com/${ e.target.value }` } );

                    if ( !validation && e.target.name === 'instagramLink' ) return setInput( { ...input, [ e.target.name ]:`https://instagram.com/${ e.target.value }` } );

                    setInput( { ...input, [ e.target.name ]:e.target.value } );
                    

                } }
                className={ `bg-white rounded-2xl h-auto ${ mobileResolution ? 'w-3/4' : 'w-2/4' } p-5 outline-none flex flex-col items-center justify-center space-y-5` }>
                    { socialsMedia.map( ( socialMedia ) => (

                        <div 
                        key={ socialMedia.id }
                        className='space-x-5 flex flex-row items-center'>
                            <socialMedia.icon
                            className='text-green-400'
                            />
                            <InputBase
                            disabled={ disable[ socialMedia.id ] }
                            ref={ socialMedia.ref }
                            name={ `${ socialMedia.id }Link` }
                            placeholder={ `Type your business's ${ socialMedia.id }` }
                            className='outline-none font-light w-full'
                            value={ input[ `${ socialMedia.id }Link` ] }
                            />
                            { disable[ socialMedia.id ] 
                            ?
                            <IconButton
                            onClick={ () => {

                                setDisable( { ...disable, [ socialMedia.id ]:false } );

                                setInput( { ...input, [ `${ socialMedia.id }Link` ]: `https://${ socialMedia.id }.com/` } );

                            } }
                            style={{ outline:'none' }}
                            >
                                <VisibilityRoundedIcon className='text-green-400'/>
                            </IconButton>
                            :
                            <IconButton
                            onClick={ () => {

                                setDisable( { ...disable, [ socialMedia.id ]:true } );

                                setInput( { ...input, [ `${ socialMedia.id }Link` ]:'' } );



                            } }
                            style={{ outline:'none' }}
                            >
                                <VisibilityOffRoundedIcon className='text-red-500'/>
                            </IconButton>
                            }
                        </div>

                    ) ) }
                    { !isLoading 
                    ? 
                    <button
                    type='submit'
                    style={ defaultTransiton }
                    className={ outlineButton }
                    >
                        Save
                    </button> 
                    :
                    <div className='py-5'>
                        <PropagateLoader/>
                    </div>
                    }
                    { alert.type && <AlertAnimation setCloseAlert={ setAlert }/> }
                </form>
        </ModalOptions>
    );
};

export default ChangeSocialMediaLinks;
