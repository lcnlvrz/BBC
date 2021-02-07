const nodemailer = require( 'nodemailer' );

const getTransportToSendOTP = ( otp, email ) => {

    
    const transporter = nodemailer.createTransport({

        service:'gmail',
        auth: {
            user:'lucianoalvarez1212@gmail.com',
            pass:'mlxfiiboldawtvpe'
        }
    
    });
    
    const mailDetails = {
    
        from: 'lucianoalvarez1212@gmail.com',
        to: email,
        subject: 'Verify Email Address BCC',
        html:`<p> The code to validate your account is: </p>
        <h1> ${ otp } </h1>`
    };

    return { transporter, mailDetails };


};
module.exports = { getTransportToSendOTP };
