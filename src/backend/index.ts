import Express from 'express';
import { publicPath } from './config/configData.js';
import { staticRouter } from './routes/staticRouter.js';
import apiRouter from './routes/apiRouter.js';

const app = Express();
const port = 3000;

app.use(Express.urlencoded({ extended: true }));

app.use(Express.static(publicPath));

app.use("/", staticRouter);
app.use("/api/v1/", apiRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});