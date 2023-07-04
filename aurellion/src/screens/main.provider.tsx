import { JsonRpcSigner } from '@ethersproject/providers'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

export type UserType = 'customer' | 'driver';

interface IMainContext {
    wallet: JsonRpcSigner | undefined,
    setWallet: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
    walletAddress: string
    setWalletAddress: Dispatch<SetStateAction<string>>
    universalLink: string
    setUniversalLink: Dispatch<SetStateAction<string>>
    deepLink: string
    setDeepLink: Dispatch<SetStateAction<string>>
    wcURI: string
    setWcURI: Dispatch<SetStateAction<string>>
    userType: UserType
    setUserType: Dispatch<SetStateAction<UserType>>
}

export const MainContext = React.createContext<IMainContext>({
    wallet: undefined,
    setWallet: () => { },
    walletAddress: '',
    setWalletAddress: () => { },
    universalLink: '',
    setUniversalLink: () => { },
    deepLink: '',
    setDeepLink: () => { },
    wcURI: '',
    setWcURI: () => { },
    userType: 'customer',
    setUserType: () => { }
})

interface MainProviderProps {
    children: React.ReactNode
}

const MainProvider = ({ children }: MainProviderProps) => {
    const [wallet, setWallet] = useState<JsonRpcSigner | undefined>()
    const [walletAddress, setWalletAddress] = useState<string>('')
    const [universalLink, setUniversalLink] = useState<string>('')
    const [deepLink, setDeepLink] = useState<string>('')
    const [wcURI, setWcURI] = useState<string>('')
    const [userType, setUserType] = useState<UserType>('customer')

    return (
        <MainContext.Provider value={{
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
        }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);

export default MainProvider;