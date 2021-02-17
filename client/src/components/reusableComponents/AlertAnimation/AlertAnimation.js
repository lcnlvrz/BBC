import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const AlertAnimation = (props) => {

  const { setCloseAlert, severity, message } = props;

  const [open, setOpen] = React.useState( true );

  const handleClose = async (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

   await setOpen(false);
   setCloseAlert( false );

  };

  return (
      <Snackbar 
      style={{ zIndex:'1000000' }}
      open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={ severity }>
          { message }
        </Alert>
      </Snackbar>
  );
};

export default AlertAnimation;