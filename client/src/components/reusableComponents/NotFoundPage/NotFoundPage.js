import React from 'react';
import { Link } from 'react-router-dom';
import { defaultTransiton, fillButton } from '../../../constants/styles';
import NotFoundImage from '../../../images/notFound.jpg';

const NotFoundPage = () => {
    return (
        <div className='h-screen flex items-center justify-center flex-col'>
            <img
            className='w-full h-5/6 object-contain'
            alt=''
            src={ NotFoundImage }
            />
            <Link 
            className='bottom-2'
            to='/'>
                    <button
                    style={ defaultTransiton }
                    className={  fillButton  }
                    >
                        Back to Home
                    </button>
            </Link>
        </div>
    );
};

export default NotFoundPage;
