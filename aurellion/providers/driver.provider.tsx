import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Journey } from "@/constants/Types";

interface IDriverContext {
  availableJourneys: Journey[] | [];
  setAvailableJourneys: Dispatch<SetStateAction<Journey[] | []>>;
  yourJourneys: Journey[] | [];
  setYourJourneys: Dispatch<SetStateAction<Journey[] | []>>;
}

export const DriverContext = React.createContext<IDriverContext>({
  availableJourneys: [],
  setAvailableJourneys: () => {},
  yourJourneys: [],
  setYourJourneys: () => {},
});

interface DriverProviderProps {
  children: React.ReactNode;
}

const DriverProvider = ({ children }: DriverProviderProps) => {
  const [availableJourneys, setAvailableJourneys] = useState<Journey[] | []>([]);
  const [yourJourneys, setYourJourneys] = useState<Journey[] | []>([]);

  return (
    <DriverContext.Provider
      value={{
        availableJourneys,
        setAvailableJourneys,
        yourJourneys,
        setYourJourneys,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => useContext(DriverContext);

export default DriverProvider;
