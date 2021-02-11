import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { defaultTransiton } from '../../../constants/styles';
import { Link } from 'react-router-dom';
import { useLogout } from '../../../hooks/useLogout';
import { Fragment } from 'react';
import { optionsLeftMenu } from '../../../constants/content';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentSearch } from '../../../actions/currentSearch';

const LeftMenu = ( props ) => {

    const logoutUser = useLogout();

    const dispatch = useDispatch();

    const { width, setChangeSection } = props;

    const url = new URL( window.location.href );

    const currentSection = url.searchParams.get( 'section' );

    const [currentOption, setCurrentOption] = useState( 0 );

    const user = useSelector(state => state.user);

    useEffect(() => {

        if ( currentSection === 'panel' ) return setCurrentOption( 0 );

        if ( currentSection === 'real-time-data' ) return setCurrentOption( 1 );

        if ( currentSection === 'business-profile' ) return setCurrentOption( 2 );

        if ( currentSection === 'products' ) return setCurrentOption( 3 );

        if ( currentSection === 'add-product' ) return setCurrentOption( 4 );

        if ( currentSection === 'live-chat' ) return setCurrentOption( 5 );
        
    }, [ currentSection ]);

    const useStyles = makeStyles((theme) => ({
        large: {
          width: theme.spacing(10),
          height: theme.spacing(10)
        },
    }));
    
    const classes = useStyles();

    return (
        <div className={ `left__part bg-green-400 p-5 flex h-screen justify-start flex-col space-y-5 ${ width } sticky top-0 z-30` }>
            <div className='flex flex-col items-center space-y-2'>
                <Avatar
                src={ user.profilePhoto }
                className={ `${ classes.large } bg-white` }
                />
                <h3 className='font-semibold text-white text-lg truncate w-full text-center'> 
                    { user.businessName }
                </h3>
            </div>
            <div className='all__options flex flex-col'>
                <div className='group__one flex-col flex space-y-5'>
                    { optionsLeftMenu.map( ( option, index ) => (

                        <Fragment key={ index }>
                            { option.title === 'Logout' 
                            ?  
                            <div 
                            onClick={ logoutUser }
                            style={ defaultTransiton }
                            className={ `one__option flex flex-row w-full space-x-2 ${ currentOption === index ? 'text-white' : 'text-blue-900' } hover:text-white cursor-pointer` }>
                                { currentOption === index && 
                                <h3> | </h3> }
                                <option.Icon
                                />
                                <h3 
                                className={ `text-sm ${ index === currentOption ? 'font-semibold' : 'font-light' }` }> 
                                    { option.title }
                                </h3>
                            </div>
                            :
                            <Link 
                            onClick={ () => {

                                setChangeSection( [ true ]);

                                if ( option.title === 'Public Profile' ) dispatch( setCurrentSearch( { ...user, business:true, isLoading:false } ) );  

                            } }
                            to={ option.title === 'Public Profile' ? `/search/business/?username=${ user.username }` : option.route }>
                                <div 
                                onClick={ () => setCurrentOption( index ) }
                                style={ defaultTransiton }
                                className={ `one__option flex flex-row w-full space-x-2 ${ currentOption === index ? 'text-white' : 'text-blue-900' } hover:text-white cursor-pointer` }>
                                    { currentOption === index && 
                                    <h3> | </h3> }
                                    <option.Icon
                                    />
                                    <h3 
                                    className={ `text-sm ${ index === currentOption ? 'font-semibold' : 'font-light' }` }> 
                                        { option.title }
                                    </h3>
                                </div>
                            </Link>
                            }
                        </Fragment>
                    ) ) } 
                </div>
            </div>
        </div>
    );
};

export default LeftMenu;
