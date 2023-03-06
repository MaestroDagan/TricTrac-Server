import express from 'express';
import consola from 'consola';
import matchmakingRouter from './routes';

const app = express();
app.use((_req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  next();
});

app.use(matchmakingRouter);

app.listen(process.env.PORT, () => {
  consola.info(`Server is running on port ${process.env.PORT}`);
});
