import { TipoProductoRepository } from '../repository/tipoProductos.repository';
export class TipoProductoService{
    constructor(private tipoProductoRepository: TipoProductoRepository){}

    async getAll(){
        const tipos = await this.tipoProductoRepository.getAll();

        if(!tipos){
            throw new Error('No se encontraron tipos de productos registrados');
        }

        return tipos;
    }

    async getById(id:number){
        const tipo = await this.tipoProductoRepository.getById(id);

        if(!tipo){
            throw new Error('Tipo de producto no encontrado');
        }

        return tipo;
    }
}