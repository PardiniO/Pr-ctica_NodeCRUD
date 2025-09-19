import { pool } from "../config/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";
import { IUsario } from "../interfaces/usuario.interface";
import { insertUser, selectUser, selectById, selectByEmail, updateUser, deleteUser } from "../queries/usuario.queries";

export class UsuarioModel {
    static async create(usuario: IUsario): Promise<number> {
        const { nombre, email, contraseña, rol } = usuario;
        const [result] = await pool.query<ResultSetHeader>(
            insertUser, [nombre, email, contraseña, rol || 'user']
        );
        return result.insertId;
    }

    static async findAll(): Promise<IUsario[]> {
        const [rows] = await pool.query<IUsario[]>(selectUser);
        return rows as IUsario[];
    }

    static async findById(id: number): Promise<IUsario | null> {
        const [rows] = await pool.query<IUsario[]>(selectById, [id]);
        return rows.length > 0 ? (rows[0] as IUsario): null;
    }

    static async findByEmail(email: string): Promise<IUsario | null> {
        const [rows] = await pool.query<IUsario[]>(selectByEmail, [email]);
        return rows.length > 0 ? (rows[0] as IUsario): null;
    }

    static async update(id: number, usuario: IUsario): Promise<boolean> {
        const { nombre, email, contraseña, rol } = usuario;
        const [result] = await pool.query<ResultSetHeader>(updateUser, [nombre, email, contraseña, rol, id]);
        return result.affectedRows > 0;
    }

    static async delete(id: number): Promise<boolean> {
        const [result] = await pool.query<ResultSetHeader>(deleteUser, [id]);
        return result.affectedRows > 0;
    }
}