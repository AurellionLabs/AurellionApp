import {JsonRpcSigner} from '@ethersproject/providers';
import React, {Dispatch, SetStateAction, useContext, useState} from 'react';
import {ParcelData, UserType, DeliveryOption} from '../common/types/types';

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
  setIsDarkMode: Dispatch<SetStateAction<boolean>>;
  isDarkMode: boolean;
  setUserType: Dispatch<SetStateAction<UserType>>;
  packageDeliveryData: ParcelData | undefined;
  setPackageDeliveryData: Dispatch<SetStateAction<ParcelData | undefined>>;
  refetchDataFromAPI: boolean;
  setRefetchDataFromAPI: Dispatch<SetStateAction<boolean>>;
  recipientWalletAddress: string;
  setRecipientWalletAddress: Dispatch<SetStateAction<string>>;
  deliveryOption: DeliveryOption | undefined;
  setDeliveryOption: Dispatch<SetStateAction<DeliveryOption | undefined>>;
}

export const MainContext = React.createContext<IMainContext>({
  wallet: undefined,
  setWallet: () => {},
  walletAddress: '',
  setWalletAddress: () => {},
  universalLink: '',
  setUniversalLink: () => {},
  deepLink: '',
  setDeepLink: () => {},
  wcURI: '',
  setWcURI: () => {},
  userType: 'customer',
  setUserType: () => {},
  packageDeliveryData: undefined,
  setPackageDeliveryData: () => {},
  refetchDataFromAPI: false,
  setRefetchDataFromAPI: () => {},
  recipientWalletAddress: '',
  setRecipientWalletAddress: () => {},
  deliveryOption: undefined,
  setDeliveryOption: () => {},
  isDarkMode: false,
  setIsDarkMode: () => {},
});

interface MainProviderProps {
  children: React.ReactNode;
}

const MainProvider = ({children}: MainProviderProps) => {
  const [wallet, setWallet] = useState<JsonRpcSigner | undefined>();
  const [walletAddress, setWalletAddress] = useState<string | undefined>('');
  const [universalLink, setUniversalLink] = useState<string>('');
  const [deepLink, setDeepLink] = useState<string>('');
  const [wcURI, setWcURI] = useState<string>('');
  const [userType, setUserType] = useState<UserType>('customer');
  const [packageDeliveryData, setPackageDeliveryData] = useState<
    ParcelData | undefined
  >(undefined);
  const [refetchDataFromAPI, setRefetchDataFromAPI] = useState<boolean>(false);
  const [recipientWalletAddress, setRecipientWalletAddress] =
    useState<string>('');
  const [deliveryOption, setDeliveryOption] = useState<
    DeliveryOption | undefined
  >(undefined);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
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
        setDeliveryOption,
        isDarkMode,
        setIsDarkMode,
      }}>
      {children}
    </MainContext.Provider>
  );
};

export const useMainContext = () => useContext(MainContext);

export default MainProvider;
