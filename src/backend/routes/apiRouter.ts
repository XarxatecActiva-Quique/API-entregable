import Express from 'express';
import userRouter from './userRouter.js';
import adressRouter from './adressRouter.js';


const apiRouter = Express.Router();

apiRouter.use("/users", userRouter);
apiRouter.use("/adress", adressRouter);


export default apiRouter;