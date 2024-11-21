import Express from 'express';
import { User } from '../types/User.js';
import { deleteUser, getAllUsers, getUser, newUser, modifyUser } from '../controllers/userController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { DeleteResult } from '../types/DeleteResult.js';

const userRouter = Express.Router();

userRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllUsers();
    res.json(result);
  });
  
userRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
    const result = await getUser(req.params.id);
    res.send(result);
  });
 
userRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const user: User = {userName: req.body.username, name: req.body.name, first_surname: req.body.surname, email: req.body.email, password: req.body.password};
    const result = await newUser(user);
    res.send(result);
});

userRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {  
    const result: DeleteResult = await deleteUser(req.params.id);
    let statusCode=200;
    if(!result.success && result.rowsAffected==0) statusCode=404;
    if(!result.success && !("rowsAffected" in result)) statusCode=500;
    res.status(statusCode).json({message: result.message});
});

userRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {

    const userId = req.params.id;
    const updatedFields: Partial<User> = { 
        userName: req.body.username, 
        name: req.body.name, 
        first_surname: req.body.surname, 
        email: req.body.email, 
        password: req.body.password 
    };

    const result = await modifyUser(userId, updatedFields);
    res.send(result);
});

export default userRouter;