export class AromaService {
    constructor(aromaRepository) {
        this.aromaRepository = aromaRepository;
    }
    async getAll() {
        const aromas = await this.aromaRepository.getAll();
        if (!aromas) {
            throw new Error('No se encontraron aromas registrados');
        }
        return aromas;
    }
    async create(aroma) {
        const arom = await this.aromaRepository.getByName(aroma);
        if (arom) {
            throw new Error('Ya existe un aroma con ese nombre');
        }
        return await this.aromaRepository.create(aroma);
    }
    async delete(id) {
        const aroma = await this.aromaRepository.getById(id);
        if (!aroma) {
            throw new Error('No existe el aroma con el id brindado');
        }
        return await this.aromaRepository.delete(id);
    }
}
//# sourceMappingURL=aroma.service.js.map