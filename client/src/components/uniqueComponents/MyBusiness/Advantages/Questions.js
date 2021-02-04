import React from 'react';
import { defaultTransiton } from '../../../../constants/styles';

const Questions = ( props ) => {

    const { questionsAndAnswers } = props;

    return (
        <div className='mt-28 flex flex-row flex-wrap justify-evenly m-10'>
            { questionsAndAnswers.map( ( item, index ) => (

                <div 
                key={ index }
                style={ defaultTransiton }
                className='description text-center border p-5 bg-white rounded-2xl hover:text-white hover:bg-black cursor-pointer space-y-2 card__myBusiness w-96 my-5'>
                    <h3 className='text-2xl font-semibold title__card'> 
                        { item.title }
                    </h3>
                    <p className='font-light'> 
                        { item.text }
                    </p>
                </div>
            ) ) }
        </div>
    );
};

export default Questions;
