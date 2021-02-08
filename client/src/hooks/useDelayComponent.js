import { useState, useEffect } from 'react';

export const useDelayComponent = () => {

    const [isLoadingComponent, setIsLoadingComponent] = useState( true );

    const [isStartDelay, setIsStartDelay] = useState( false );

    useEffect(() => {

        if ( isStartDelay ) {

            window.scrollTo(0, 0);

            setTimeout(function () {

                let viewheight = window.innerHeight;
                let viewwidth = window.innerWidth;
                let viewport = document.querySelector("meta[name=viewport]");
                viewport.setAttribute("content", "height=" + viewheight + "px, width=" + viewwidth + "px, initial-scale=1.0");
    
            }, 300);
    
            setTimeout(() => {
    
                setIsLoadingComponent( false );
                
            }, 2000);

        };
        
    }, [ isStartDelay ]);

    return { setIsStartDelay, isLoadingComponent };

};