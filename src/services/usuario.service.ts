import bcrypt from "bcrypt";
import { UsuarioModel } from "../models/usuario.model";
import { IUsario } from "../interfaces/usuario.interface";

export class UsuarioService {
    static async register(datos: IUsario) {
        const existe: IUsario | null = await UsuarioModel.findByEmail(datos.email);

        if (existe) throw new Error("Email ya registrado");
        if (!datos) throw new Error("Complete todos los campos");
        if (datos.contraseña.length < 6) throw new Error("Escriba una contraseña de 6 caracteres o más");
        
        const hashedPass = await bcrypt.hash(datos.contraseña, 10);
        datos.contraseña = hashedPass;

        const id = await UsuarioModel.create(datos);
        return { id, ...datos, contraseña: undefined };
    }

    static async listarUsuarios() {
        return await UsuarioModel.findAll();
    }

    static async buscarPorEmail(email: string) {
        return await UsuarioModel.findByEmail(email);
    }

    static async buscarPorId(id: number) {
        return await UsuarioModel.findById(id);
    }

    static async editarUsuario(id: number, datos: IUsario) {
        if (datos.contraseña) {
            datos.contraseña = await bcrypt.hash(datos.contraseña, 10);
        }

        const actualizado = await UsuarioModel.update(id, datos);
        return actualizado;
    }

    static async borrarUsuario(id: number) {
        return await UsuarioModel.delete(id);
    }
}