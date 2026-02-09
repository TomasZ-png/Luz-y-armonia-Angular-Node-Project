import { ProductoRepository } from "../repository/producto.repository";
import { ReseniaRepository } from "../repository/resenia.repository";

export class ReseniaService{

    constructor(private reseniaRepository: ReseniaRepository, private productoRepository: ProductoRepository){}

    async createResenia(data: any){
        const calificacion = data.calificacion;
        const idProducto = data.idProducto;

        const producto = await this.productoRepository.getProductById(idProducto);

        if(!producto){
            throw new Error('El producto no existe');
        }
        
        if(calificacion < 1 || calificacion > 5){
            throw new Error('La calificacion no puede ser menor de 1 ni mayor a 5');
        }

        if(producto.cantidadResenias === 0){
            await this.productoRepository.actualizarReseniasYPuntuacion(idProducto, calificacion)
        }

        await this.reseniaRepository.generateProductResenia(data);

        const nuevaPuntuacion = ((producto.puntuacionTotal! * producto.cantidadResenias!) + calificacion) / (producto.cantidadResenias! + 1)

        await this.productoRepository.actualizarReseniasYPuntuacion(idProducto, nuevaPuntuacion);
    }

    async getReseniaByProduct(idProducto: number){
        return await this.reseniaRepository.getReseniaByProduct(idProducto);
    }
}