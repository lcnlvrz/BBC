import React from 'react';
import { defaultTransiton } from '../../../../constants/styles';
import EditRoundedIcon from '@material-ui/icons/EditRounded';
import { IconButton } from '@material-ui/core';
import CheckRoundedIcon from '@material-ui/icons/CheckRounded';
import ClipLoader from "react-spinners/ClipLoader";

const OneField = ( props ) => {

    const { item, setIsEditing, setInput, isEditing, input, user, update, isLoading } = props;

    return (
        <div 
        className='flex flex-col items-center justify-center w-72'>
            <item.icon
            style={{ fontSize:'100px' }}
            />
            <div className='flex flex-col items-center justify-center'>
                <h2 className='font-semibold'> 
                    { item.title } 
                </h2>
                <div className='flex flex-row items-center justify-center space-x-5'>
                    <IconButton
                    disabled
                    className='opacity-0'
                    >
                        <EditRoundedIcon
                        style={ defaultTransiton }
                        className='text-black hover:text-green-400'
                        />
                    </IconButton>
                    <form
                    onChange={ async (e) => {

                        await setInput( { ...input, [ e.target.name ]:e.target.value } );

                        item.ref.current.focus();

                    } }
                    className='flex flex-row items-center justify-center space-x-5'
                    onSubmit={ async (e) => {

                        e.preventDefault();

                        await setIsEditing( { ...isEditing, [ item.id ]:false } );

                        item.ref.current.blur();
                        
                        if ( input[ item.id ] !== user[ item.id ] ) update( { ...input, fieldChanged:item.id } );

                    } }
                    >
                        <input
                        required
                        name={ item.id }
                        onClick={ () => item.ref.current.blur() }
                        ref={ item.ref }
                        className='text-center outline-none text-5xl text-green-400 w-2/4'
                        defaultValue={ input[ [ item.id ] ] }
                        />
                        { isEditing[ item.id ] && !isLoading
                        ?
                        <IconButton
                        type='submit'
                        style={{ outline:'none' }}
                        className='hover:text-red-500'>
                            <CheckRoundedIcon
                            
                            style={ defaultTransiton }
                            className='text-black hover:text-green-400'
                            />
                        </IconButton>
                        :
                        isEditing[ item.id ] && isLoading
                        ?
                        <ClipLoader size='25px'/>
                        :
                        <IconButton
                        style={{ outline:'none' }}
                        onClick={ async () => {

                            await setIsEditing( { ...isEditing, [ item.id ]:true } );

                            item.ref.current.focus();

                        } }
                        className='hover:text-red-500'>
                            <EditRoundedIcon
                            style={ defaultTransiton }
                            className='text-black hover:text-green-400'
                            />
                        </IconButton>
                        }
                    </form>
                </div>
            </div>
        </div>  
    );
};

export default OneField;
