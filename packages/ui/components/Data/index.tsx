import React, { useState, useEffect } from "react";
import {DataRecord }from "../DataRecord";
import { map } from "lodash";

const dataRecord = {
  title: "title",
  time: "time",
  url: "url",
};

const Data = ( { }) => {


  const handleDelete = async () => {
    console.log("delete");
  }

  return (
    <div className="data">
                  <DataRecord dataRecord={dataRecord} handleDelete={handleDelete}  />

    </div>
  );
};

export default Data;


