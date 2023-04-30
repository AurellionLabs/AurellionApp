import express from 'express';
import { map, of } from '../../node_modules/rxjs/dist/types/index.js';
const router = express.Router();
import { Location } from '../common/types.js';
import {locationsBetweenTwoCoordinates} from '../controllers/parcels.controller.js'

router.get('/boxes-between-coordinates',(req, res, next) => {
    res.locals.start_location = {lat: parseFloat(req.query.start_lat as string), lng:parseFloat(req.query.start_lng as string)}
    res.locals.end_location = {lat: parseFloat(req.query.end_lat as string), lng:parseFloat(req.query.end_lng as string)}
    res.locals.radius = parseInt(req.query.radius as string)
    next()
} ,locationsBetweenTwoCoordinates)

export default router
