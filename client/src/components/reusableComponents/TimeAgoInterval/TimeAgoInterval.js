import React from 'react';
import { useEffect, useState } from 'react';
import moment from 'moment';

const TimeAgoInterval = ( props ) => {

    const { date, classes } = props;

    const [timeAgo, setTimeAgo] = useState( moment( date ).fromNow() );

    useEffect(() => {

       const interval = setInterval(() => {

            const fromNow = moment( date ).fromNow();

            setTimeAgo( fromNow );
        

        }, 1000);

        return () => { clearInterval( interval ) };

    }, [ date ]);

    return ( 

        <p className={ classes }> 
            { timeAgo } 
        </p>
         
    );
};

export default TimeAgoInterval;
