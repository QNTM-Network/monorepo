import {useState} from 'react';
import axios from 'axios';

import { Dialog, Button, Box, Typography, Checkbox, DialogTitle, DialogActions, DialogContent, DialogContentText, TextField  } from "@mui/material";
import { IQuant }from '../../../utils/types/index';

import styles from "./QuantModal.module.scss";

interface Props {
  quant: any;
  handleClose: () => void;
  handleDelete: (quant: IQuant) => void;
  updateQuantHandler: () => void;
  setSelectedQuant: (quant: IQuant) => void;
  selectedQuant: IQuant;
}

const QuantModal = ({ updateQuantHandler, handleDelete, quant, setSelectedQuant, selectedQuant}: Props) => {

  console.log({selectedQuant});


  return (
    <>

        <DialogTitle>{quant.name}</DialogTitle>
        <DialogContent className={styles.modal__content}>
          <DialogContentText>
            {quant.name}
          </DialogContentText>
          <Typography>Repeat</Typography>
          <Checkbox
            className={styles.modal__content__checkbox}
            value="check"
            checked={selectedQuant?.reoccurring}
            onChange={() => setSelectedQuant({...selectedQuant, reoccurring: !selectedQuant.reoccurring})}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={updateQuantHandler}>Update</Button>
          <Button onClick={() => handleDelete(quant)}>Delete</Button>
        </DialogActions>
  </>
      )}

export default QuantModal;
