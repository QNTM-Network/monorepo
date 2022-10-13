import React, { useState } from "react";
import axios from "axios";

<<<<<<< HEAD
import {Header, Footer, Page } from 'ui';
=======
import { Header} from 'ui' 
>>>>>>> d215d3831dab9f1ea9d55ec00ee761cf4335cf78

export function App() {

  return (
    <>
      <Header />
    </>
  );
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg == "to-popup") {
    console.log("working");
    sendResponse(1);
  }
});
