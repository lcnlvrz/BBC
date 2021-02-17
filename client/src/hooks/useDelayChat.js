import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';



export const useDelayChat = () => {

    const [messages, setMessages] = useState({});

    const contentMessageRef = useRef( null );

    
    const [refParentContainer, inViewParentContainer] = useInView({
        triggerOnce: true,
        delay:200
    });

    const [refChat, inViewChat] = useInView({
        triggerOnce: true,
        delay:200
    });

    useEffect(() => {

        for (let i = 0; i < 6; i++) {
            
            setMessages( messages => ({ ...messages, [ `${ i }Message` ]:false }) );
            
        };

    }, []);

    const scrollToLastMessage = () => {

        contentMessageRef.current.scroll({ top: contentMessageRef.current.scrollHeight, behavior: 'smooth' }); 

    };

    useEffect(() => {

        if ( inViewChat ) {

            let i = 0

            const interval = setInterval(() => {

                if ( i === 6 ) clearInterval( interval );
                     
                setMessages( message => ({ ...message, [ `${ i }Message`]:true  }) );
                scrollToLastMessage();
                i = i + 1;
                    
            }, 1000);

            return () => { clearInterval( interval ) };  

        };

        
    }, [ inViewChat ]);

    return { messages, contentMessageRef, refChat, refParentContainer, inViewParentContainer };


};