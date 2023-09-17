import React, { useState, useCallback, useEffect } from "react";
import Routes from "../navigation";
import MainProvider from "./main.provider";

function App(): JSX.Element {
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
}

export default App;
