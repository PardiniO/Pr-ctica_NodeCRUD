export interface IUsario {
    id?: number;
    nombre: string;
    email: string;
    contraseña: string;
    rol?: 'user' | 'admin';
    fechaCreacion?: Date;
    fechaModificacion?: Date;
}