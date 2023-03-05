import express from 'express';
import consola from 'consola';
import router from './routes';

const app = express();
app.use(router);

app.listen(process.env.PORT, () => {
  consola.info(`Server is running on port ${process.env.PORT}`);
});
