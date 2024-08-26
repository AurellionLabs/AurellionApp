import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Order } from "@/constants/Types";

interface INodeContext {
  availableOrders: Order[] | [];
  setAvailableOrders: Dispatch<SetStateAction<Order[] | []>>;
  yourOrders: Order[] | [];
  setYourOrders: Dispatch<SetStateAction<Order[] | []>>;
}

export const NodeContext = React.createContext<INodeContext>({
  availableOrders: [],
  setAvailableOrders: () => {},
  yourOrders: [],
  setYourOrders: () => {},
});

interface NodeProviderProps {
  children: React.ReactNode;
}

const NodeProvider = ({ children }: NodeProviderProps) => {
  const [availableOrders, setAvailableOrders] = useState<Order[] | []>([]);
  const [yourOrders, setYourOrders] = useState<Order[] | []>([]);

  return (
    <NodeContext.Provider
      value={{
        availableOrders,
        setAvailableOrders,
        yourOrders,
        setYourOrders,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => useContext(NodeContext);

export default NodeProvider;
