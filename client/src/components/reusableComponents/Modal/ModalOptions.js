import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useStylesModalOptions } from './styles';

export default function ModalOptions( props ) {

  const { setCloseModal } = props;

  const classes = useStylesModalOptions();
  const [open, setOpen] = React.useState( true );

  const handleClose = async () => {

    await setOpen(false);
    setCloseModal( false );
    

  };

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          { props.children }
        </Fade>
      </Modal>
  );
}