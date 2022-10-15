import {useState} from 'react';
import axios from 'axios';

import { Dialog, Button, Box, Typography, Checkbox, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField  } from "@mui/material";


import styles from "./QuantModal.module.scss";

interface Props {
  dataRecord: any;
  handleClose: () => void;
  handleDelete: (dataRecord: any) => void;
}

const QuantModal = ({dataRecord, handleClose, handleDelete}: Props) => {
  const [reoccurring, setReoccurring] = useState(false);

const handleSetReoccurrance = () => {
  setReoccurring(!reoccurring);
  axios.patch(`/api/quant/${dataRecord._id}`, { reoccurring: !reoccurring})
}

  return (
    <>
        <DialogTitle>{dataRecord.name}</DialogTitle>
        <DialogContent className={styles.modal__content}>
          <DialogContentText>
            {dataRecord.name}
          </DialogContentText>
          <Typography>Repeat</Typography>
          <Checkbox
            className={styles.modal__content__checkbox}
            value="check"
            checked={reoccurring}
            onChange={handleSetReoccurrance} 
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(dataRecord)}>Delete</Button>
        </DialogActions>
  </>
      )}

export default QuantModal;
