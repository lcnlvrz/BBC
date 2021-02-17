import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { returnAdminPanelSections } from '../constants/content';

export const usePanel = () => {

    const user = useSelector(state => state.user);

    const [lastUpdateRealTime, setlastUpdateRealTime] = useState(0);

    const [panelSections, setPanelSections] = useState( [] );

    useEffect(() => {

        if ( !user.isLoading && user.userID ) {

            const lastUpdateWorking = user.lastUpdatePersonalWorking;
            const lastUpdateClientsInTheShop = user.lastUpdateClientsInTheShop;

            if ( lastUpdateWorking > lastUpdateClientsInTheShop ) {

                const isValid = moment( lastUpdateWorking ).isValid();

                if ( !isValid ) return false;
                
                const parse = moment.unix( lastUpdateWorking ).format();
                const timeAgo = moment( parse ).fromNow();
                setlastUpdateRealTime( timeAgo );

            } else {

                const isValid = moment( lastUpdateClientsInTheShop ).isValid();

                if ( !isValid ) return false;

                const parse = moment.unix( lastUpdateClientsInTheShop ).format();
                const timeAgo = moment( parse ).fromNow();
                setlastUpdateRealTime( timeAgo );

            };

        };
       
    }, [ user ]); 

    useEffect(() => {

        const sections = returnAdminPanelSections( user, lastUpdateRealTime );

        setPanelSections( sections );
        
    }, [user, lastUpdateRealTime]);

    return { panelSections };

};