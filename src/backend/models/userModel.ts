import pool from "../config/configDb.js";
import { DeleteResult } from "../types/DeleteResult.js";
import { User } from "../types/User.js";


export async function saveNewUser(user:User):Promise<any>{
    const queryString = `INSERT INTO "user" ("userName", "name", "first_surname", "password", "email") VALUES ('${user.userName}', '${user.name}', '${user.first_surname}', '${user.password}','${user.email}')`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function getUsers():Promise<any>{  
    const queryString = `SELECT * FROM "user"`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function findUserById(id:string):Promise<any>{
    const queryString = `SELECT * FROM "user" WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    return result.rows;
}

export async function deleteUserById(id: string): Promise<DeleteResult> {
    try {
        const queryString = `DELETE FROM "user" WHERE "id" = ${id}`;
        const result = await pool.query(queryString);
        
        if (result.rowCount && result.rowCount > 0) {
            return {
                success: true,
                message: 'Usuario eliminado correctamente',
                rowsAffected: result.rowCount
            };
        } else {
            return {
                success: false,
                message: 'No se encontró el usuario',
                rowsAffected: 0
            };
        }
    } catch (error) {
        return {
            success: false,
            message: `Error al eliminar usuario: ${(error as Error).message}`
        };
    }
}

export async function updateUserById(id: string, updatedFields: Partial<User>): Promise<any> {

    const setClause = Object.keys(updatedFields)
        .map((key) => `"${key}" = '${updatedFields[key as keyof User]}'`)
        .join(", ");
    
    const queryString = `UPDATE "user" SET ${setClause} WHERE "id" = ${id}`;
    const result = await pool.query(queryString);
    
    if (result.rowCount !== null && result.rowCount > 0) {
        return {
            success: true,
            message: 'Usuario actualizado correctamente',
            rowsAffected: result.rowCount
        };
    } else {
        return {
            success: false,
            message: 'No se encontró el usuario',
            rowsAffected: 0
        };
    }
}   