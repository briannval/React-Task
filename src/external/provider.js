import React, { useState, createContext } from "react";

export const MobileContext = createContext();

export const MobileProvider = props => {
  const [Mobile, setMobile] = useState([]);

  return (
    <MobileContext.Provider value={[Mobile, setMobile]}>
      {props.children}
    </MobileContext.Provider>
  );
};
