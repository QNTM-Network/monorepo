import React, { useState, useEffect } from "react";
import {DataRecord} from "ui";
import {
  getPages,
  deletePage
} from "../utils/page";
import { useGroupedDataRecords } from '../utils/date';
import { map } from "lodash";



const Data = ( { pageContent , setPageContent}) => {
  const groupedDataRecords = useGroupedDataRecords(pageContent);


  const handleDelete = async (dataRecord) => {
    console.log("delete", dataRecord);
    await deletePage(dataRecord.url);
    setPageContent(await getPages())
  }

  return (
    <div className="data">
        {map(groupedDataRecords, (group, id) =>   {
          return (
            <>
              <p className="group-date">{group.date}</p>
              {map(group.dataRecords, (dataRecord, key) => {
                return (
                  <div key={key}> 
                  <DataRecord handleDelete={handleDelete} dataRecord={dataRecord} />
                  </div>
                )
              })}
              </>
          );
        })}

    </div>
  );
};

export default Data;


