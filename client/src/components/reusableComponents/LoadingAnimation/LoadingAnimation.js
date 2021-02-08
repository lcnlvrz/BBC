import React from 'react';

const LoadingAnimation = () => {
    return (
        <div className="divLoader z-50 absolute bg-white">
            <h1 className='point-hidden'> . </h1>
            <div className="sk-folding-cube">
            <div className="sk-cube1 sk-cube"></div>
            <div className="sk-cube2 sk-cube"></div>
            <div className="sk-cube4 sk-cube"></div>
            <div className="sk-cube3 sk-cube"></div>
            </div>
        </div>
    );
};

export default LoadingAnimation;
