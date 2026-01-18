import { AromaRepository } from "../repository/aroma.repository";
import { AromaService } from "../services/aroma.service";
const aromaRepository = new AromaRepository();
const aromaService = new AromaService(aromaRepository);
export class AromaController {
    async getAll(req, res) {
        try {
            const aromas = await aromaService.getAll();
            res.status(200).json(aromas);
        }
        catch (error) {
            res.status(400).json({ error: error });
        }
    }
    async create(req, res) {
        try {
            const aroma = await aromaService.create(req.body.aroma);
            console.log(aroma);
            res.status(200).json({ message: 'Aroma agregado correctamente', aroma: aroma });
        }
        catch (error) {
            res.status(400).json({ message: 'Hubo un error en el controllador', error: error.message });
        }
    }
    async delete(req, res) {
        try {
            const id = Number(req.params.id);
            if (isNaN(id)) {
                return res.status(400).json({ message: 'El id debe ser un numero valido' });
            }
            await aromaService.delete(id);
            res.status(200).json({ message: 'Aroma eliminado correctamente' });
        }
        catch (error) {
            res.status(400).json({ message: 'Error al eliminar el aroma', error: error.message });
        }
    }
}
//# sourceMappingURL=aroma.controller.js.map