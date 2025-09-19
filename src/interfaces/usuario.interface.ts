import { RowDataPacket } from "mysql2";

export interface IUsario extends RowDataPacket{
    id?: number;
    nombre: string;
    email: string;
    contraseña: string;
    rol?: 'user' | 'admin';
    fechaCreacion?: Date;
    fechaModificacion?: Date;
}