import { useEffect, useState } from "react";
import VariableContext from "./VariableContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../public/Firebase";

const VariableProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [location, setLocation] = useState({
    lat: 12.89960,
    long: 80.22090,
  });

  useEffect(()=>{
    onAuthStateChanged(auth, use => {
      if(use){
        setUser(use);
      } 
      else setUser(null);
    });
  },[])

  return (
    <VariableContext.Provider value={{ location, setLocation, user}}>
      {children}
    </VariableContext.Provider>
  );
};

export default VariableProvider;