import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const CustomRoute = ( props ) => {

    const [returnedRoute, setReturnedRoute] = useState( "" );

    const user = useSelector(state => state.user);

    useEffect(() => {

        if ( !user.isLoading ) {

            switch ( props.condition ) {
                case 'business':
                    
                    return setReturnedRoute( 
    
                        user.condition === 'business' ? ( <Route { ...props }/> )
                        : ( <Redirect to='/'/> )
    
                    );
                case 'notLoggedIn':

                    console.log( user.condition );

                    return setReturnedRoute(

                        !user.condition ? 
                        ( <Route { ...props }/> )
                        :
                        ( <Redirect to='/business/?section=panel'/> )

                    );

                case 'notLoggedInSignUp':

                    return setReturnedRoute(

                        !user.condition ? 
                        ( <Route { ...props }/> )
                        :
                        ( <Redirect to='/business/?section=panel'/> )

                    );
            
                default:
                    return setReturnedRoute( <Route { ...props }/> );
            };

        };
        
    }, [ user, props ]);

    return <> { returnedRoute } </>
};

export default CustomRoute;
