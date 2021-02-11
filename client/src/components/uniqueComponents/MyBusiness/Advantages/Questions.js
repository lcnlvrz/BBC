import React from 'react';
import { defaultTransiton } from '../../../../constants/styles';

const Questions = ( props ) => {

    const { questionsAndAnswers } = props;

    const quantityPresentations = [ 'One', 'Two' ];

    return (
        <div className='mt-40 flex flex-row flex-wrap justify-evenly m-10'>
            { quantityPresentations.map( ( presentation, index ) => (

                <div 
                key={ index }
                style={ defaultTransiton }
                className='description text-center border p-5 bg-white rounded-2xl hover:text-white hover:bg-black cursor-pointer space-y-2 card__myBusiness w-96 my-5'>
                    <p className='font-light'> 
                        { questionsAndAnswers[ `mainPresentation${ presentation }` ] }
                    </p>
                </div>

            ) ) }
            
    </div>
    );
};

export default Questions;
