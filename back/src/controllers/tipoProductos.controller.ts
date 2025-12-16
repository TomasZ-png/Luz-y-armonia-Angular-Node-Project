import { type Request, type Response } from "express"
import { TipoProductoRepository } from "../repository/tipoProductos.repository";
import { TipoProductoService } from "../services/tipoProductoService.service";

const tipoProductoRepository = new TipoProductoRepository();
const tipoProductoService = new TipoProductoService(tipoProductoRepository);

export class TipoProductoController{

    async getAll(req:Request, res:Response){
        try {
            const tipos = await tipoProductoService.getAll();
            res.status(200).json(tipos);
        } catch (error) {
            res.status(400).json({error: error});
        }
    }

    async getById(req:Request, res:Response){
        try {
            const id = Number(req.params.id);

            if(isNaN(id)){
                return res.status(400).json({ message: 'El id del tipo de producto debe ser numerico.'});
            }

            const tipo = await tipoProductoService.getById(id);

            if(!tipo){
                return res.status(404).json({message: `Tipo de producto con id ${id} no encontrado`});
            }

            res.status(200).json(tipo);
        } catch (error) {
            res.status(400).json({error: error});
        }
    }
}