import React, { useState, useEffect } from "react";
import { format, parseISO} from 'date-fns'
import {ToggleButton }from '@mui/material';
import {Check, AccessAlarm, ThreeDRotation } from '@mui/icons-material';
//@ts-ignore
import styles from "./DataRecord.module.scss";


import { map } from "lodash";

export const DataRecord = ( { dataRecord , handleDelete}) => {
  const [selected, setSelected] = useState(false);



  return (
    <div className={styles.data}>
            <div className={styles.data__record}>
              <div className={styles.data__record__left}>
                <label className="data-record-checkbox-container">
              <input
                type="checkbox"
                value="check"
              checked={selected}
                onChange={() => setSelected(!selected)}
              >
              </input>

              <span className="data-record-checkmark"></span>
                </label>
              <div className={styles.data__record__title}>
                <p>{dataRecord.title}</p>
              </div>
              </div>
              <div className="time">
                <p className={styles.data__record__title}>{dataRecord.time}</p>
              </div>
              {selected && (

              <div  onClick={() => handleDelete(dataRecord)}className={selected ? 'delete-slide__selected' :  'delete-slide'}>
                  <p className="delete-button">
                    Delete
                  </p>
                </div>
              )}
            </div>
    </div>
  );
};



