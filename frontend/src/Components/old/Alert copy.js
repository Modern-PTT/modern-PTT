import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({btntext, maintitle, mainfiled, leftbtn, rightbtn,leftfunction, rightfunction}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    leftfunction();
  };

  const handleClose = () => {
    setOpen(false);
    rightfunction();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        {btntext}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {maintitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {mainfiled}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{leftbtn}</Button>
          <Button onClick={handleClose} autoFocus>{rightbtn}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
