import React, { useState, useEffect } from "react";
import { Dialog, Button, Box, Typography, Checkbox, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField  } from "@mui/material";

//@ts-ignore
import styles from "./DataRecord.module.scss";

interface Props {
  dataRecord: any;
  handleDelete: (dataRecord: any) => void;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  borderRadius: 5,
  bgcolor: 'background.paper',
  backgrountColor: 'grey',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const DataRecord = ( { dataRecord , handleDelete}: Props) => {
  const [selected, setSelected] = useState(false);


const handleClose = () => {
  console.log("close");
  setSelected(false);
};

  return (
    <div className={styles.data}>
            <div className={styles.data__record}>
              <div className={styles.data__record__left}>
                <label className="data-record-checkbox-container">
              <Checkbox
                className={styles.data__record__left__checkbox}
                value="check"
              checked={selected}
                onChange={() => setSelected(!selected)}
              />

              <span className="data-record-checkmark"></span>
                </label>
              <div className={styles.data__record__title}>
                <p>{dataRecord.name}</p>
              </div>
              </div>

              <div className="time">
                <p className={styles.data__record__title}>{dataRecord.time}</p>
              </div>
              {selected && (
      <Dialog PaperProps={{
    style: { borderRadius: 15, width: 400 },
  }}
  className={styles.modal} open={selected} onClose={handleClose}>
        <div className={styles.modal__container}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent className={styles.modal__content}>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete}>Delete</Button>
        </DialogActions>
        </div>
      </Dialog>
    
    )}  
            </div>
    </div>
  );
};



