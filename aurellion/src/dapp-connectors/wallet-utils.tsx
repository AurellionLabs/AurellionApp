import '@walletconnect/react-native-compat';
import {
  web3Provider,
} from '../utils/UniversalProvider';

export const getSigner = async () => {
    if (web3Provider) {
        const wallet =await web3Provider.getSigner();
        console.log( await web3Provider.getNetwork())
        return wallet
    }
}
