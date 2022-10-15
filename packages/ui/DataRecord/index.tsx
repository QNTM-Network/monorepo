import React, { useState, useEffect } from "react";
import { Dialog, Checkbox} from "@mui/material";

import  QuantModal  from './QuatModal/index'

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

              {selected && (
      <Dialog PaperProps={{
    style: { borderRadius: 15, width: 400 },
  }}
  className={styles.modal} open={selected} onClose={handleClose}>
        <div className={styles.modal__container}>
          <QuantModal dataRecord={dataRecord} handleDelete={handleDelete} handleClose={handleClose}/>
        </div>
      </Dialog>
    
    )}  
            </div>
    </div>
  );
};



