import express from 'express';
const router = express.Router();
import { locationsBetweenTwoCoordinates } from '../controllers/parcels.controller.js';
router.get('/boxes-between-coordinates', (req, res, next) => {
    res.locals.start_location = { lat: parseFloat(req.query.start_lat), lng: parseFloat(req.query.start_lng) };
    res.locals.end_location = { lat: parseFloat(req.query.end_lat), lng: parseFloat(req.query.end_lng) };
    res.locals.radius = parseInt(req.query.radius);
    next();
}, locationsBetweenTwoCoordinates);
export default router;
