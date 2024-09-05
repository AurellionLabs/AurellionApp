import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Asset, Journey } from "@/constants/Types";

interface ICustomerContext {
  sendingPackages: Journey[] | [];
  setSendingPackages: Dispatch<SetStateAction<Journey[] | []>>;
  receivingPackages: Journey[] | [];
  setReceivingPackages: Dispatch<SetStateAction<Journey[] | []>>;
  availableAssets: Asset[] | [];
  setAvailableAssets: Dispatch<SetStateAction<Asset[] | []>>;
}

export const CustomerContext = React.createContext<ICustomerContext>({
  sendingPackages: [],
  setSendingPackages: () => {},
  receivingPackages: [],
  setReceivingPackages: () => {},
  availableAssets: [],
  setAvailableAssets: () => {},
});

interface customerProviderProps {
  children: React.ReactNode;
}

const customerProvider = ({ children }: customerProviderProps) => {
  const [sendingPackages, setSendingPackages] = useState<Journey[] | []>([]);
  const [receivingPackages, setReceivingPackages] = useState<Journey[] | []>(
    []
  );
  const [availableAssets, setAvailableAssets] = useState<Asset[] | []>([]);

  return (
    <CustomerContext.Provider
      value={{
        sendingPackages,
        setSendingPackages,
        receivingPackages,
        setReceivingPackages,
        availableAssets,
        setAvailableAssets,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);

export default customerProvider;
