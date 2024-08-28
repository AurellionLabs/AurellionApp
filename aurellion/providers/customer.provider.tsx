import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Journey } from "@/constants/Types";

interface ICustomerContext {
  sendingPackages: Journey[] | [];
  setSendingPackages: Dispatch<SetStateAction<Journey[] | []>>;
  receivingPackages: Journey[] | [];
  setReceivingPackages: Dispatch<SetStateAction<Journey[] | []>>;
}

export const CustomerContext = React.createContext<ICustomerContext>({
  sendingPackages: [],
  setSendingPackages: () => {},
  receivingPackages: [],
  setReceivingPackages: () => {},
});

interface customerProviderProps {
  children: React.ReactNode;
}

const customerProvider = ({ children }: customerProviderProps) => {
  const [sendingPackages, setSendingPackages] = useState<Journey[] | []>([]);
  const [receivingPackages, setReceivingPackages] = useState<Journey[] | []>(
    []
  );

  return (
    <CustomerContext.Provider
      value={{
        sendingPackages,
        setSendingPackages,
        receivingPackages,
        setReceivingPackages
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);

export default customerProvider;
