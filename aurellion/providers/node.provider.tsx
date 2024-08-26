import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Order } from "@/constants/Types";

interface INodeContext {
  availableOrders: Order[] | [];
  setAvailableOrders: Dispatch<SetStateAction<Order[] | []>>;
  yourOrders: Order[] | [];
  setYourOrders: Dispatch<SetStateAction<Order[] | []>>;
  selectedAvailableOrder: Order | undefined;
  setSelectedAvailableOrder: Dispatch<SetStateAction<Order | undefined>>;
  selectedYourOrder: Order | undefined;
  setSelectedYourOrder: Dispatch<SetStateAction<Order | undefined>>;
}

export const NodeContext = React.createContext<INodeContext>({
  availableOrders: [],
  setAvailableOrders: () => {},
  yourOrders: [],
  setYourOrders: () => {},
  selectedAvailableOrder: undefined,
  setSelectedAvailableOrder: () => {},
  selectedYourOrder: undefined,
  setSelectedYourOrder: () => {},
});

interface NodeProviderProps {
  children: React.ReactNode;
}

const NodeProvider = ({ children }: NodeProviderProps) => {
  const [availableOrders, setAvailableOrders] = useState<Order[] | []>([]);
  const [yourOrders, setYourOrders] = useState<Order[] | []>([]);
  const [selectedAvailableOrder, setSelectedAvailableOrder] = useState<
    Order | undefined
  >(undefined);
  const [selectedYourOrder, setSelectedYourOrder] = useState<Order | undefined>(
    undefined
  );
  return (
    <NodeContext.Provider
      value={{
        availableOrders,
        setAvailableOrders,
        yourOrders,
        setYourOrders,
        selectedAvailableOrder,
        setSelectedAvailableOrder,
        selectedYourOrder,
        setSelectedYourOrder,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => useContext(NodeContext);

export default NodeProvider;
