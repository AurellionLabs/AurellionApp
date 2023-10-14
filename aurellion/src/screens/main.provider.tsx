import { JsonRpcSigner } from "@ethersproject/providers";
import React, { Dispatch, SetStateAction, useContext, useState } from "react";
import { PackageDeliveryData, UserType, DeliveryOption, DeliverySpeedOption } from "../common/types/types";

interface IMainContext {
  wallet: JsonRpcSigner | undefined;
  setWallet: Dispatch<SetStateAction<JsonRpcSigner | undefined>>;
  walletAddress: string | undefined;
  setWalletAddress: Dispatch<SetStateAction<string | undefined>>;
  universalLink: string;
  setUniversalLink: Dispatch<SetStateAction<string>>;
  deepLink: string;
  setDeepLink: Dispatch<SetStateAction<string>>;
  wcURI: string;
  setWcURI: Dispatch<SetStateAction<string>>;
  userType: UserType;
  setUserType: Dispatch<SetStateAction<UserType>>;
  packageDeliveryData: PackageDeliveryData | undefined;
  setPackageDeliveryData: Dispatch<
    SetStateAction<PackageDeliveryData | undefined>
  >;
  refetchDataFromAPI: boolean;
  setRefetchDataFromAPI: Dispatch<SetStateAction<boolean>>;
  recipientWalletAddress: string
  setRecipientWalletAddress: Dispatch<SetStateAction<string>>
  deliveryOption: DeliveryOption | undefined
  setDeliveryOption: Dispatch<SetStateAction<DeliveryOption | undefined>>
}

export const MainContext = React.createContext<IMainContext>({
  wallet: undefined,
  setWallet: () => {},
  walletAddress: "",
  setWalletAddress: () => {},
  universalLink: "",
  setUniversalLink: () => {},
  deepLink: "",
  setDeepLink: () => {},
  wcURI: "",
  setWcURI: () => {},
  userType: "customer",
  setUserType: () => {},
  packageDeliveryData: undefined,
  setPackageDeliveryData: () => {},
  refetchDataFromAPI: false,
  setRefetchDataFromAPI: () => {},
  recipientWalletAddress: '',
  setRecipientWalletAddress: () => { },
  deliveryOption : undefined,
  setDeliveryOption: () => {},
});

interface MainProviderProps {
  children: React.ReactNode;
}

const MainProvider = ({ children }: MainProviderProps) => {
  const [wallet, setWallet] = useState<JsonRpcSigner | undefined>();
  const [walletAddress, setWalletAddress] = useState<string | undefined>(undefined);
  const [universalLink, setUniversalLink] = useState<string>("");
  const [deepLink, setDeepLink] = useState<string>("");
  const [wcURI, setWcURI] = useState<string>("");
  const [userType, setUserType] = useState<UserType>("customer");
  const [packageDeliveryData, setPackageDeliveryData] = useState<
    PackageDeliveryData | undefined
  >(undefined);
  const [refetchDataFromAPI, setRefetchDataFromAPI] = useState<boolean>(false);
  const [recipientWalletAddress, setRecipientWalletAddress] = useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<DeliveryOption | undefined>(undefined);

  return (
    <MainContext.Provider
      value={{
        wallet,
        setWallet,
        walletAddress,
        setWalletAddress,
        universalLink,
        setUniversalLink,
        deepLink,
        setDeepLink,
        wcURI,
        setWcURI,
        userType,
        setUserType,
        packageDeliveryData,
        setPackageDeliveryData,
        refetchDataFromAPI,
        setRefetchDataFromAPI,
        recipientWalletAddress,
        setRecipientWalletAddress,
        deliveryOption,
        setDeliveryOption
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
