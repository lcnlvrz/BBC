import { preSubmitPublishProduct } from "../helpers/preSubmit"

export const createProductAPI = ( setAlert, inputData ) => {

    const isValid = preSubmitPublishProduct( inputData, setAlert );

    if ( !isValid ) return false;

    // axios..



}