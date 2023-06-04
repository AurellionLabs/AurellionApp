import '@walletconnect/react-native-compat';
import {
  web3Provider,
} from '../utils/UniversalProvider';

export const getSigner = async () => {
    if (web3Provider) {
        const wallet =web3Provider.getSigner();
        return wallet
    }
}
