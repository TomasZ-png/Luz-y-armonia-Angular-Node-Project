import { type Request, type Response } from "express"
import { AromaRepository } from "../repository/aroma.repository";
import { AromaService } from "../services/aroma.service";

const aromaRepository = new AromaRepository();
const aromaService = new AromaService(aromaRepository);

export class AromaController{

    async getAll(req:Request, res:Response){
        try {
            const aromas = await aromaService.getAll();
            res.status(200).json(aromas);
        } catch (error) {
            res.status(400).json({error: error});
        }
    }

}