const generateOTP = () => { 
          
    const digits = '0123456789'; 
    let OTP = ''; 
    for (let i = 0; i < 4; i++ ) { 
        OTP += digits[Math.floor(Math.random() * 10)]; 
    } 
    return OTP; 
}; 

const getCodePromise = () => { 
    
    return new Promise( ( resolve, reject ) => {

       const otp = generateOTP();

       if ( otp.length === 4 ) resolve( otp );

       reject( false );

    } );

};

module.exports = { getCodePromise };

