import { saveNewAdress, getAdresses, findAdressById, updateAdressByUserId, deleteAdressByUserId } from "../models/adressModel.js";
import { Adress } from "../types/Adress.js";
import { DeleteResult } from "../types/DeleteResult.js";

export async function newAdress(adress:Adress):Promise<string>{
    try {
        const result = await saveNewAdress(adress);
        return result;
    } catch (error:any){
        if (error.code === "23505") {
            const columnMatch = error.detail.match(/Key \((.*?)\)=/);
            const columnName = columnMatch ? columnMatch[1] : 'campo';
            return `El ${columnName} ya existe en la base de datos`;
        }
        return error;
    }
}

export async function getAllAdresses():Promise<string>{
    const result = await getAdresses();
    return result;
}

export async function getAdress(id:string):Promise<string>{
    const result = await findAdressById(id);
    return result;
}

export async function modifyAdress(id: string, updatedFields: Partial<Adress>): Promise<any> {
    try {

        const result = await updateAdressByUserId(id, updatedFields);
        return result;
    } catch (error: any) {
        return {
            success: false,
            message: 'Error al modificar la dirección',
            error: error.message
        };
    }
}

export async function deleteAdress(id:string):Promise<DeleteResult>{
    const result = await deleteAdressByUserId(id);  
    return result;
}