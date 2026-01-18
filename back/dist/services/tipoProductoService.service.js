export class TipoProductoService {
    constructor(tipoProductoRepository) {
        this.tipoProductoRepository = tipoProductoRepository;
    }
    async getAll() {
        const tipos = await this.tipoProductoRepository.getAll();
        if (!tipos) {
            throw new Error('No se encontraron tipos de productos registrados');
        }
        return tipos;
    }
    async getById(id) {
        const tipo = await this.tipoProductoRepository.getById(id);
        if (!tipo) {
            throw new Error('Tipo de producto no encontrado');
        }
        return tipo;
    }
}
//# sourceMappingURL=tipoProductoService.service.js.map