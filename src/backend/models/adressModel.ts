import pool from "../config/configDb.js";
import { Adress } from "../types/Adress.js";

export async function saveNewAdress(adress:Adress):Promise<any>{

    const queryString = `INSERT INTO "adress" ("id_user", "street", "city", "phone") VALUES ('${adress.id_user}', '${adress.street}', '${adress.city}', '${adress.phone}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getAdresses():Promise<any>{
    const queryString = `SELECT * FROM "adress"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findAdressById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "adress" WHERE "id_user" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function updateAdressByUserId(id_user: string, updatedFields: Partial<Adress>): Promise<any> {
    const setClause = Object.keys(updatedFields)
        .map((key) => `"${key}" = '${updatedFields[key as keyof Adress]}'`)
        .join(", ");
    
    const queryString = `UPDATE "adress" SET ${setClause} WHERE "id_user" = '${id_user}'`;
    const result = await pool.query(queryString);
    
    if (result.rowCount !== null && result.rowCount > 0) {
        return {
            success: true,
            message: 'Dirección actualizada correctamente',
            rowsAffected: result.rowCount
        };
    } else {
        return {
            success: false,
            message: 'No se encontró la dirección',
            rowsAffected: 0
        };
    }
}

export async function deleteAdressByUserId(id_user: string): Promise<any> {
    try {
        const queryString = `DELETE FROM "adress" WHERE "id_user" = '${id_user}'`;
        const result = await pool.query(queryString);
        if (result.rowCount !== null && result.rowCount > 0) {
            return {
                success: true,
                message: 'Dirección eliminada correctamente',
                rowsAffected: result.rowCount
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar la dirección: ${(error as Error).message}`
        };
    }
}