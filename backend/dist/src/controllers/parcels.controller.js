var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBoxesAtLocationWithRadius, isBoxInOval } from '../helpers/parcels.helper';
// const Web3 = require('web3');
import Web3 from 'web3';
const web3 = new Web3('https://goerli.infura.io/v3/a112337d1b3f4974942223a6dcef0a92');
import contractABI from '../../locationContract.json' assert { type: "json" };
const contractAddress = '0x4069dAa6560877921Ada0e46E258614A33f00318';
const contractInstance = new web3.eth.Contract(contractABI, contractAddress);
const locationsBetweenTwoCoordinates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const journey = {
        start_location: res.locals.start_location,
        end_location: res.locals.end_location
    };
    const data = yield getBoxesAtLocationWithRadius(journey.start_location, res.locals.radius);
    const parcels = data.map(result => ({
        location: result["geometry"]["location"],
        name: result["name"]
    }));
    const parcelsWithinArea = parcels.filter(parcel => isBoxInOval(parcel.location, journey));
    console.log(parcelsWithinArea);
    const solidityParcelsWithinArea = parcelsWithinArea.map(parcel => {
        parcel.location.lat = parseFloat(parcel.location.lat.toFixed(14)) * Math.pow(10, 14);
        parcel.location.lng = parseFloat(parcel.location.lng.toFixed(14)) * Math.pow(10, 14);
        return parcel;
    });
    console.log(solidityParcelsWithinArea);
    const returnVal = yield contractInstance.methods.uploadLocationData(solidityParcelsWithinArea).call();
    console.log("smart contract return:", returnVal);
    res.json(parcelsWithinArea);
});
export { locationsBetweenTwoCoordinates };
