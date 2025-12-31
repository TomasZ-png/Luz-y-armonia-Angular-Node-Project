import { AromaRepository } from '../repository/aroma.repository';
export class AromaService{
    constructor(private aromaRepository: AromaRepository){}

    async getAll(){
        const aromas = await this.aromaRepository.getAll();

        if(!aromas){
            throw new Error('No se encontraron aromas registrados');
        }

        return aromas;
    }

    async create(aroma:string){
    const arom = await this.aromaRepository.getByName(aroma);

        if(arom){
            throw new Error('Ya existe un aroma con ese nombre');
        }

        return await this.aromaRepository.create(aroma);
    }

    async delete(id:number){
        const aroma = await this.aromaRepository.getById(id);

        if(!aroma){
            throw new Error('No existe el aroma con el id brindado');
        }

        return await this.aromaRepository.delete(id);
    }
}