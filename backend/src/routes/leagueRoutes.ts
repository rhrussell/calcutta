import { Router } from 'express';
import { createLeague, finalizeAuction } from '../controllers/leagueController';

const router = Router();

router.post('/create', createLeague);
router.put('/finalize', finalizeAuction);

export default router;
