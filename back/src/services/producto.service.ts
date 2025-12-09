import { ProductoRepository } from "../repository/producto.repository";

export class ProductoService {

    constructor(private productoRepository: ProductoRepository){}

    async createProduct(data: any){
        return await this.productoRepository.createNewProduct(data);
    }

    async updateProduct(id:number, data:any){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        return await this.productoRepository.updateProduct(id, data);
    }

    async deleteProduct(id:number){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        return await this.productoRepository.deleteProduct(id);
    }

    async getProductoById(id:number){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        return product;
    }

    async getProductoByName(nombre:string){
        const product = await this.productoRepository.getProductByName(nombre);

        if(!product){
            throw new Error('No se han encontrado productos con el nombre ingresado.');
        }

        return product;
    }

    async getAllProducts(){
        const products = await this.productoRepository.getAll();

        if(!products){
            throw new Error('No se encontraron ningun producto.');
        }

        return products;
    }

}