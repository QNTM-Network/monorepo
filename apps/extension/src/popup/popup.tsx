import React, { useState } from "react";
import axios from "axios";

import {Header, Footer, Page } from 'ui';

export function App() {

  return (
    <>
      <Header />
      <Page />
      <Footer />
    </>
  );
}

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg == "to-popup") {
    console.log("working");
    sendResponse(1);
  }
});
