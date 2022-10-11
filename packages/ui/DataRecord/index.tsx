import React, { useState, useEffect } from "react";

//@ts-ignore
import styles from "./DataRecord.module.scss";

interface Props {
  dataRecord: any;
  handleDelete: (dataRecord: any) => void;
}


import { map } from "lodash";

export const DataRecord = ( { dataRecord , handleDelete}: Props) => {
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
                <p>{dataRecord.name}</p>
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



