import express from 'express';
import { map, of } from '../../node_modules/rxjs/dist/types/index.js';
const router = express.Router();
import { Location } from '../common/types.js';
import { getAllEventsForType } from '../controllers/events.controller';

router.get('/getAllEventsForType',(req, res, next) => {
    res.locals.id = req.query.id
    res.locals.type = req.query.type
    next()
} ,getAllEventsForType)
router.get('/KillOldEvents',(req, res, next) => {
} ,getAllEventsForType)

export default router
