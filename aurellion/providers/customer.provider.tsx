import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Asset, Journey, Order } from "@/constants/Types";

interface ICustomerContext {
  sendingPackages: Journey[] | [];
  setSendingPackages: Dispatch<SetStateAction<Journey[] | []>>;
  receivingPackages: Journey[] | [];
  setReceivingPackages: Dispatch<SetStateAction<Journey[] | []>>;
  availableAssets: Asset[] | [];
  setAvailableAssets: Dispatch<SetStateAction<Asset[] | []>>;
  yourOrders: Order[] | [];
  setYourOrders: Dispatch<SetStateAction<Order[] | []>>;
}

export const CustomerContext = React.createContext<ICustomerContext>({
  sendingPackages: [],
  setSendingPackages: () => {},
  receivingPackages: [],
  setReceivingPackages: () => {},
  availableAssets: [],
  setAvailableAssets: () => {},
  yourOrders: [],
  setYourOrders: () => {},
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
  const [yourOrders, setYourOrders] = useState<Order[] | []>([]);
  return (
    <CustomerContext.Provider
      value={{
        sendingPackages,
        setSendingPackages,
        receivingPackages,
        setReceivingPackages,
        availableAssets,
        setAvailableAssets,
        yourOrders,
        setYourOrders,
      }}
    >
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomerContext = () => useContext(CustomerContext);

export default customerProvider;
