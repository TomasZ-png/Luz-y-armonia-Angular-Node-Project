import { type Request, type Response} from 'express';
import { UsuarioRepository } from "../repository/usuario.repository";
import { UsuarioService } from "../services/usuario.service";
import jwt from 'jsonwebtoken';

const usuarioRepository = new UsuarioRepository;
const usuarioService = new UsuarioService(usuarioRepository);

export class UsuarioController {
    
    async signUp(req:Request, res:Response){
        try {
            const newUser = await usuarioService.signUp(req.body);
            res.status(200).json({message: 'Usuario registrado correctamente', usuario: newUser});
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

    async login(req:Request, res:Response){
        try {
            const { correo, password } = req.body;
            const usuarioLogueado = await usuarioService.signIn(correo, password);

            // Emitir JWT en cookie httpOnly
            const token = jwt.sign(
              { sub: usuarioLogueado.id },
              process.env.JWT_SECRET || 'secret-key',
              { expiresIn: '7d' }
            );

            res.cookie('token', token, {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'lax',
              maxAge: 7 * 24 * 60 * 60 * 1000 // 7 días en ms
            });

            res.status(200).json({message: 'Usuario logueado correctamente.', usuario: usuarioLogueado})
        } catch (error:any) {
            res.status(400).json({error: error.message})
        }
    }

    async getUserById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(isNaN(id)){
                return res.status(400).json({message: 'El id debe ser numerico'});
            }

            const user = await usuarioRepository.getUserById(id);

            if(!user){
                return res.status(404).json({message: 'Usuario no encontrado'});
            }

            res.status(200).json({message: 'Usuario encontrado.', usuario: user});
        } catch (error:any) {
            res.status(400).json({error: error.message});
        }
    }

}