import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Journey } from "@/constants/Types";

// Define the interface for the context
interface IDeliveryContext {
  selectedJourney: Journey | undefined;
  setSelectedJourney: Dispatch<SetStateAction<Journey | undefined>>;
  signatureScreenHeading: string | undefined;
  setSignatureScreenHeading: Dispatch<SetStateAction<string | undefined>>;
}

// Initialize the context with default values
const DeliveryContext = React.createContext<IDeliveryContext | undefined>(
  undefined
);

interface DeliveryProviderProps {
  children: ReactNode;
}

const DeliveryProvider = ({ children }: DeliveryProviderProps) => {
  // Create state within the provider
  const [selectedJourney, setSelectedJourney] = useState<Journey | undefined>(
    undefined
  );
  const [signatureScreenHeading, setSignatureScreenHeading] = useState<
    string | undefined
  >(undefined);
  return (
    <DeliveryContext.Provider
      value={{
        selectedJourney,
        setSelectedJourney,
        signatureScreenHeading,
        setSignatureScreenHeading,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
};

// Custom hook to use the DeliveryContext
export const useDeliveryContext = () => {
  const context = useContext(DeliveryContext);
  if (!context) {
    throw new Error(
      "useDeliveryContext must be used within a DeliveryProvider"
    );
  }
  return context;
};

export default DeliveryProvider;
