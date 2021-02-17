import React from 'react'
import { socialsMedia, textAreaBusinessProfileContentFooterFunction } from '../../../../constants/content';
import Badge from '@material-ui/core/Badge';
import InstagramIcon from '@material-ui/icons/Instagram';
import { textAreaDefaultProps } from '../../../../constants/styles';
import { TextareaAutosize } from '@material-ui/core';

const Footer = ( props ) => {

    const { input, setIsChangeSocialMediaLinks, socialMediaLinks } = props;

    const textAreaBusinessProfileContentFooter = textAreaBusinessProfileContentFooterFunction( input );

    return (
        <footer 
        style={{ margin:0 }}
        className='bg-black p-5 space-y-5 w-full'>
            <div className='flex flex-row justify-between w-full'>
                <div className='flex items-center space-x-2 w-2/4'>
                    <input
                    required
                    maxLength={ 100 }
                    name='footerTitle'
                    placeholder='Footer title. Maybe will can be your business name'
                    defaultValue={ input.footerTitle }
                    className='bg-transparent outline-none text-white font-semibold text-lg truncate'
                    />
                </div>
                <div 
                onClick={ () => setIsChangeSocialMediaLinks( true ) }
                className='space-x-2 cursor-pointer w-2/4 text-right'>

                    { socialsMedia.map( ( socialMedia ) => socialMediaLinks[ socialMedia.id ] && <socialMedia.icon key={ socialMedia.id } className='text-white'/> ) }

                    { Object.values( socialMediaLinks ).every(value => !value ) 
                    && 
                    <Badge badgeContent='+' color="secondary">
                    <InstagramIcon className='text-white'/>
                    </Badge> }

                </div>
            </div>
            <div className='footer__questions text-white flex flex-row justify-between space-x-5'>
                { textAreaBusinessProfileContentFooter.map( ( textarea, index ) => (

                    <TextareaAutosize
                    { ...textAreaDefaultProps }
                    key={ index }
                    className='bg-transparent text-white resize-none w-full outline-none'
                    name={ textarea.name }
                    placeholder={ textarea.placeholder }
                    defaultValue={ textarea.value }
                    />

                ) ) }
            </div>
            <div className='text-white z-30'>
                <input
                maxLength={ 100 }
                required
                name='footerLastLine'
                placeholder='The last line you can type'
                defaultValue={ input.footerLastLine }
                className='bg-transparent outline-none w-full z-30 relative'
                />
            </div>
        </footer>
    );
};

export default Footer;
