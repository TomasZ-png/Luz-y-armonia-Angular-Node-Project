import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ProductoRepository } from "../repository/producto.repository";


export class ProductoService {

    constructor(private productoRepository: ProductoRepository){}

    async createProduct(productoData:any, 
                        variantes:any[], 
                        imagenes: { url: string }[]
    ){  
        if(variantes.length === 0){
            throw new Error("El producto debe tener al menos una variante.");
        }

        return await prisma.$transaction(async (tx) => {
            const producto = await tx.producto.create({
                data: productoData
            });

            if(imagenes.length > 0){
                await tx.imagenProducto.createMany({
                    data: imagenes.map(img => ({
                        url: img.url,
                        idProducto: producto.id
                    }))
                });
            }

            const tipoProducto = await tx.tipo_de_productos.findUnique({
                where:{id: producto.idTipoProducto}
            });
            
            if(tipoProducto == null){
                throw new Error('Tipo de producto no econtrado.')
            }

            for(const variante of variantes){
                const sku = this.generarSKU(tipoProducto!.tipo, producto.id, variante.idAroma)

                if(variante.stock < 0){
                    return new Error('Stock invalido.')
                }

                if(variante.precio < 0){
                    return new Error('Precio invalido.')
                }

                await tx.varianteProducto.create({
                    data: {
                        idProducto: producto.id,
                        idAroma: variante.idAroma,
                        precio: variante.precio,
                        stock: variante.stock,
                        sku: sku,
                        estado: variante.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'
                    }
                })
            }
            return producto;
        })
    }

    async updateProduct(id:number, 
                        productData:any, 
                        variantes: any[], 
                        variantesEliminadas: number[], 
                        imagenes: {url: string}[]
                    ){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        await prisma.$transaction(async (tx) => {
            await tx.producto.update({
                where:{id: id},
                data: {
                    nombre: productData.nombre,
                    descripcion: productData.descripcion,
                    miniDescripcion: productData.miniDescripcion,
                    alto: productData.alto,
                    ancho: productData.ancho,
                    mililitros: productData.mililitros,
                    duracion: productData.duracion,
                    material: productData.material,
                    premium: productData.premium,

                    Tipo_de_productos:{
                        connect:{
                            id: productData.idTipoProducto
                        }
                    }
                }
            });

            if(imagenes.length){
                await tx.imagenProducto.createMany({
                    data: imagenes.map(img => ({
                        url: img.url,
                        idProducto: id
                    }))
                });
            }

            if(variantesEliminadas.length){
                await tx.varianteProducto.deleteMany({
                    where: {
                        id: {
                            in: variantesEliminadas
                        }
                    }
                });
            }
console.log(variantes);
            for(const variante of variantes){
                if(variante.id){
                    await tx.varianteProducto.update({
                        where:{id: variante.id},
                        data: {
                            precio: variante.precio,
                            stock: variante.stock,
                            idAroma: variante.idAroma,
                            estado: variante.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'
                        }
                    });
                } else {
                    const existe = await tx.varianteProducto.findFirst({
                        where:{
                            idProducto: id,
                            idAroma: variante.idAroma
                        }
                    });

                    if(existe){
                        throw new Error("Ya existe una variante con el mismo aroma.")
                    }

                    const tipoProducto = await tx.tipo_de_productos.findUnique({
                        where:{id: productData.idTipoProducto}
                    });

                    const sku = this.generarSKU(tipoProducto!.tipo, id, variante.idAroma);

                    await tx.varianteProducto.create({
                        data: {
                            idProducto: id,
                            idAroma: variante.idAroma,
                            precio: variante.precio,
                            stock: variante.stock,
                            sku: sku,
                            estado: variante.stock > 0 ? 'DISPONIBLE' : 'AGOTADO'
                        }
                    });
                }

                const variantesProducto = await tx.varianteProducto.findMany({
                    where: {idProducto: id}
                })

                const tieneStock = variantesProducto.some(v => v.stock > 0);

                await tx.producto.update({
                    where: {id: id},
                    data:{
                        estadoProducto: tieneStock ? 'DISPONIBLE' : 'AGOTADO'
                    }
                });
            }
        })
        return await this.productoRepository.getProductById(id);
    }


    async getProductoById(id:number){
        const product = await this.productoRepository.getProductById(id);

        if(!product){
            throw new Error('El producto con el id solicitado no existe.');
        }

        return product;
    }

    async getProductByNameOrAromaOrProduct(valor:string){
        
        if(!valor) {
            throw new Error('El valor de la busqueda no puede estar vacio')
        }

        const valorLimpio = valor.toLowerCase().trim();
        let palabras = valorLimpio.split(" ");

        const palabrasBasura = ["de","la","el","y","con","para"];
        palabras = palabras.filter(p => !palabrasBasura.includes(p) && p.length > 1);
        
        if(palabras.length === 0){
            throw new Error('Busqueda vacia');
        }

        const products = await this.productoRepository.buscarProductosConPalabras(palabras);

        if(!products){
            throw new Error('No se han encontrado productos con el valor ingresado.');
        }

        return products;
    }

    async getAllProducts(){
        const products = await this.productoRepository.getAll();

        if(!products){
            throw new Error('No se encontraron ningun producto.');
        }

        return products;
    }

    private generarSKU(tipo: string, idProducto: number, idAroma: number):string{
        const prefijos: Record<string, string> = {
            VELA: 'VEL',
            DIFUSOR: 'DIF',
            "BODY SPLASH": 'BSP'
        };

        const prefijo = prefijos[tipo] ?? "PRD";

        const SKU = `${prefijo}-${idProducto.toString().padStart(5, "0")}-${idAroma.toString().padStart(3, "0")}`;

        return SKU;
    }

}