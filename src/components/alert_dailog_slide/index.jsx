import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({
  title,
  subtitle,
  open,
  handleClose,
  children,
}) {
  return (
    <div >
      <Dialog
        
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle  style={{background: "#6163FF", color: "#ECEDED",}} id="alert-dialog-slide-title">
          {title}
        </DialogTitle>
        <DialogContent style={{background: "#6163FF", color: "#ECEDED",}}>
          <DialogContentText style={{background: "#6163FF", color: "#ECEDED",}} id="alert-dialog-slide-description">
            {subtitle}
          </DialogContentText>
          {children}
        </DialogContent>
        <DialogActions style={{background: "#6163FF", color: "#ECEDED",}}>
          <Button style={{background:'#ECEDED',color:'#6163FF'}} onClick={handleClose} color="primary">
            Okay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
