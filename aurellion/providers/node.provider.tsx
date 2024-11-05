import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { Order } from "@/constants/Types";

interface INodeContext {
  availableOrders: Order[] | [];
  setAvailableOrders: Dispatch<SetStateAction<Order[] | []>>;
  yourOrders: Order[] | [];
  setYourOrders: Dispatch<SetStateAction<Order[] | []>>;
  selectedNodeAddress: string,
  setSelectedNodeAddress: Dispatch<SetStateAction<string>>
}

export const NodeContext = React.createContext<INodeContext>({
  availableOrders: [],
  setAvailableOrders: () => {},
  yourOrders: [],
  setYourOrders: () => {},
  selectedNodeAddress: '',
  setSelectedNodeAddress: () => {}
});

interface NodeProviderProps {
  children: React.ReactNode;
}

const NodeProvider = ({ children }: NodeProviderProps) => {
  const [availableOrders, setAvailableOrders] = useState<Order[] | []>([]);
  const [yourOrders, setYourOrders] = useState<Order[] | []>([]);
  const [selectedNodeAddress, setSelectedNodeAddress] = useState<string>('')

  return (
    <NodeContext.Provider
      value={{
        availableOrders,
        setAvailableOrders,
        yourOrders,
        setYourOrders,
        selectedNodeAddress,
        setSelectedNodeAddress
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

export const useNodeContext = () => useContext(NodeContext);

export default NodeProvider;
