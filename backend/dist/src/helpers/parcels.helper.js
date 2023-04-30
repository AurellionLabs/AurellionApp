var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const isBoxInOval = (boxLocation, journey, sizeFactor = 1) => {
    // Calculate the length of the semi-major axis
    const a = Math.abs(journey.start_location.lng - journey.end_location.lng) / 2 * sizeFactor;
    // Calculate the length of the semi-minor axis
    const b = Math.abs(journey.start_location.lat - journey.end_location.lat) / 2 * sizeFactor;
    // Calculate the center point of the oval
    const centerX = (journey.start_location.lng + journey.end_location.lng) / 2;
    const centerY = (journey.start_location.lat + journey.end_location.lat) / 2;
    // Calculate the distance from the center point to the given coordinate
    const distance = (Math.pow(boxLocation.lng - centerX, 2) / Math.pow(a, 2)) + (Math.pow(boxLocation.lat - centerY, 2) / Math.pow(b, 2));
    // Return a boolean value indicating whether the coordinate is within the oval
    return distance <= 1;
};
export const getBoxesAtLocationWithRadius = (location, radius) => __awaiter(void 0, void 0, void 0, function* () {
    const boxUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${location.lat}%2C${location.lng}&radius=${radius}&keyword=postbox&key=AIzaSyDM53QhcGwUGJgZ_yAAX3fLy7g7c5CWsDA`;
    const response = yield fetch(boxUrl);
    const data = yield response.json();
    return data.results;
});
