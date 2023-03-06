import matchmakingRouter from './matchmaking';
import { Router } from 'express';
const router = Router();

router.use('/matchmaking', matchmakingRouter);

export default router;
