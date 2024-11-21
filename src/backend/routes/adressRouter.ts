import Express from 'express';
import { Adress } from '../types/Adress.js';
import { newAdress, getAdress, getAllAdresses, modifyAdress, deleteAdress } from '../controllers/adressController.js';
import { validateNumericParams } from '../middlewares/validateNumericParams.js';
import { DeleteResult } from '../types/DeleteResult.js';

const adressRouter = Express.Router();

adressRouter.get("/", async (req: Express.Request, res: Express.Response) => {
    const result = await getAllAdresses();
    res.json(result);
  });

adressRouter.post("/", async (req: Express.Request, res: Express.Response) => {
    const adress: Adress = {id_user: req.body.id_user, street: req.body.street, city: req.body.city, phone: req.body.phone};
    const result = await newAdress(adress);
    res.send(result);
});

adressRouter.get("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
  const result = await getAdress(req.params.id);
  res.send(result);
});

adressRouter.put("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {

  const id_user = req.params.id;
  const updatedFields: Partial<Adress> = { 
    street: req.body.street,
    city: req.body.city,
    phone: req.body.phone
  };

  const result = await modifyAdress(req.params.id, req.body);
  res.send(result);
});

adressRouter.delete("/:id", validateNumericParams, async (req: Express.Request, res: Express.Response) => {
  const result: DeleteResult = await deleteAdress(req.params.id);
  let statusCode=200;
  if(!result.success && result.rowsAffected==0) statusCode=404;
  if(!result.success && !("rowsAffected" in result)) statusCode=500;
  res.status(statusCode).json({message: result.message});
});

export default adressRouter;