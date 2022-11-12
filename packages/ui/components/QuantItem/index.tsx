import  { useState} from "react";
import { Dialog, Checkbox} from "@mui/material";
import axios from "axios";

import { getDateFromPeriod, getMostRecentDateFromDateOrToday } from '../../utils/dates';
import  QuantModal  from './QuantModal/index'
import {IQuant, IQuantsByTags } from "../../utils/types/index";

// @ts-ignore
import styles from "./QuantItem.module.scss";

interface Props {
  quant: any;
  setDisplayQuants: (quants: IQuant[]) => void;
  displayQuants: IQuant[];
  setQuantsByTags: (quants: IQuantsByTags) => void;
  quantsByTags?: IQuantsByTags;
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


export const QuantItem = ( {quantsByTags, displayQuants, setDisplayQuants,  quant}: Props) => {
 const [selectedQuant, setSelectedQuant] = useState<IQuant | null>(null);

const handleClose = () => {
  setSelectedQuant(null);
};



const handleDelete = (quant: IQuant) => {

    setDisplayQuants(displayQuants.filter((q) => q._id !== quant._id));
  
  setSelectedQuant(null);
  axios.delete(`/api/quant/${quant._id}`)
    .then(
      (response) => {
        console.log(response);
      },
      (err) => {
        console.log(err.text);
      }
    );
  
};


  const handleComplete = (quant: IQuant) => {

    setDisplayQuants(displayQuants.filter((q) => q._id !== quant._id));

    setSelectedQuant(null);
    axios.patch(`/api/quant/${quant._id}`, {...quant, status: 0})
      .then(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err.text);
        }
      );

    axios.post('/api/user/quant', {address: quant.user, quant: quant._id, tags: quant.tags})
  };


  const handleUpdate = () => {
    // remove the quant from displayQuants and replace it with selected quant
    setDisplayQuants(
      displayQuants.map((q) => {
        if (q._id === selectedQuant?._id) {
          return selectedQuant;
        }
        return q;
      })
    );

    setSelectedQuant(null);
    axios.patch(`/api/quant/${quant._id}`, selectedQuant)
      .then(
        (response) => {
          console.log(response);
        },
        (err) => {
          console.log(err.text);
        }
      );
  }


  return (
    <div 
      className={styles.data}
    >
            <div className={styles.data__record}>
              <div className={styles.data__record__left}>
                <label className="data-record-checkbox-container">
              <Checkbox
                className={styles.data__record__left__checkbox}
                value="check"
              checked={selectedQuant?._id === quant._id}
                onChange={() => setSelectedQuant(quant)}
              />

              <span className="data-record-checkmark"></span>
                </label>
              <div className={styles.data__record__title}>
                <p>{quant.name}</p>
              </div>
              </div>

              {selectedQuant && (
      <Dialog PaperProps={{
    style: { borderRadius: 15, width: 400 },
  }}
  className={styles.modal} open={selectedQuant._id === quant._id} onClose={handleClose}>
        <div className={styles.modal__container}>
          <QuantModal selectedQuant={selectedQuant} setSelectedQuant={setSelectedQuant} handleUpdate={handleUpdate} quant={quant} handleDelete={handleDelete} handleComplete={handleComplete} handleClose={handleClose}/>
        </div>
      </Dialog>
    
    )}  
            </div>
    </div>
  );
};



