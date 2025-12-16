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
}