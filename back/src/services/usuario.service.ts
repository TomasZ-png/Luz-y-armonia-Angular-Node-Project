import { MiCarritoRepository } from "../repository/miCarrito.repository";
import { UsuarioRepository } from "../repository/usuario.repository";
import bcrypt from "bcrypt";

export class UsuarioService{

    constructor(private usuarioRepository: UsuarioRepository){}

    async signUp(data: any){
        const email = data.correo;
        
        const usuario = await this.usuarioRepository.getUserByEmail(email);
        
        if(usuario !== null){
            throw new Error('El email ingresado ya existe.');
        }
        
        const passHashed = await bcrypt.hash(data.password, 10);
        data.password = passHashed;
        
        return await this.usuarioRepository.createUser(data);
    }

    async signIn(email:string, pass:string){
        const usuario = await this.usuarioRepository.getUserByEmail(email);

        if(!usuario){
            throw new Error('No existe registros con el correo ingresado.');
        }

        const passHashed = await bcrypt.compare(pass, usuario.password)
        
        if(!passHashed){
            throw new Error("La contraseña no coincide.");            
        }

        return usuario;
    }

    async getUserById(id:number){
        const user = await this.usuarioRepository.getUserById(id);
        
        if(!user){
            throw new Error(`No se encontró al usuario de id ${id}`);
        }

        return user;
    }

}