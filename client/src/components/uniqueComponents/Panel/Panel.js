import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { Fade } from '@material-ui/core';
import { Helmet } from 'react-helmet-async';
import { usePanel } from '../../../hooks/usePanel';
import OnePanelSection from './OnePanelSection';

const Panel = () => {

    const mobileResolution = useMediaQuery({ query:'( max-width: 700px )' });

    const { panelSections } = usePanel();
    
    const DataPanel = () => {

        return ( 
            <Fade in>
                <div className={ `container__all__sections flex flex-col p-2 space-y-10 ${ mobileResolution && 'pt-28' }` }>
                    <Helmet>
                        <title> Business Client Connection - Panel </title>
                    </Helmet>
                    { panelSections.map( ( section, index ) => <OnePanelSection key={ index } section={section}/> ) }
                </div>
            </Fade>
        );
    };

    return <DataPanel/>;
};

export default Panel;
