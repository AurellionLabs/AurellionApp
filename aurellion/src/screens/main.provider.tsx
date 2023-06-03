import { JsonRpcSigner } from '@ethersproject/providers'
import { Signer } from 'ethers'
import React, { Dispatch, SetStateAction, useState } from 'react'

interface IMainContext {
    wallet: JsonRpcSigner | undefined,
    setWallet: Dispatch<SetStateAction<JsonRpcSigner | undefined>>
}

export const MainContext = React.createContext<IMainContext>({
    wallet: undefined,
    setWallet: () => { }
})

interface MainProviderProps {
    children: React.ReactNode
}

const MainProvider = ({ children }: MainProviderProps) => {
    const [wallet, setWallet] = useState<JsonRpcSigner | undefined>()
    return (
        <MainContext.Provider value={{
            wallet,
            setWallet
        }}>
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider;