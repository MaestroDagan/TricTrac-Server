import { Router } from 'express';
const router = Router();
const apiRouter = Router();

apiRouter.get('/', (_req, res) => {
  return res.status(200).send({ data: 'api endpoint', msg: 'OK' }).end();
});

router.use('/api', apiRouter);

export default router;
