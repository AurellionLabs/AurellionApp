import { JsonRpcSigner } from '@ethersproject/providers'
import { Signer } from 'ethers'
import React, { Dispatch, SetStateAction, useContext, useState } from 'react'

interface IMainContext {
    wallet: JsonRpcSigner | undefined,
    setWallet: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
    walletAddress: string
    setWalletAddress: Dispatch<SetStateAction<string>>
}

export const MainContext = React.createContext<IMainContext>({
    wallet: undefined,
    setWallet: () => { },
    walletAddress: '',
    setWalletAddress: () => {}
})

interface MainProviderProps {
    children: React.ReactNode
}

const MainProvider = ({ children }: MainProviderProps) => {
    const [wallet, setWallet] = useState<JsonRpcSigner | undefined>()
    const [walletAddress, setWalletAddress] = useState<string>('')
    
    return (
        <MainContext.Provider value={{
            wallet,
            setWallet,
            walletAddress,
            setWalletAddress
        }}>
            {children}
        </MainContext.Provider>
    )
}

export const useMainContext = () => useContext(MainContext);

export default MainProvider;