import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";

export class ProductoRepository{

    async createNewProduct(data: Prisma.ProductoCreateInput){
        return await prisma.producto.create({data})
    }

    async updateProduct(id:number, data:Prisma.ProductoUpdateInput){
        return await prisma.producto.update({
            data, 
            where:{id}
        })
    }

    async getProductById(id:number){
        return await prisma.producto.findUnique({
            where: {id},

            include: {
                VarianteProducto: {
                    include: {
                        Aroma: true
                    }
                },
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        })
    }

    async buscarProductosConPalabras(palabras: string[]){
        return await prisma.producto.findMany({
            where: {
                AND: palabras.map(palabra => ({
                    OR: [
                        {
                            nombre: {
                                contains: palabra,
                                mode: 'insensitive'
                            }
                        },
                        {
                            VarianteProducto: {
                                some: {
                                    Aroma: {
                                        aroma: {
                                            contains: palabra,
                                            mode: 'insensitive'
                                        }
                                    }
                                }
                            }
                        },
                        {
                            Tipo_de_productos: {
                                tipo: {
                                    contains: palabra,
                                    mode: 'insensitive'
                                }
                            }
                        }
                    ]
                }))
            },
            include: {
                VarianteProducto: {
                    include: {
                        Aroma: true
                    }},
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        })
    }

    async getProductByNameOrAromaOrProduct(valor:string){
        return await prisma.producto.findMany({
            where: {
                OR: [
                    {
                        nombre: {
                            contains: valor,
                            mode: 'insensitive'
                        }
                    },
                    {
                        VarianteProducto: {
                            some: {
                                Aroma: {
                                    aroma: {
                                        contains: valor,
                                        mode: 'insensitive'
                                    }
                                }
                            }
                        }
                    },
                    {
                        Tipo_de_productos: {
                            tipo: {
                                contains: valor,
                                mode: 'insensitive'
                            }
                        }
                    }
                ]
            },

            include: {
                VarianteProducto: {
                    include: {
                        Aroma: true
                    }},
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        })
    }

    async getAll(){
        return await prisma.producto.findMany({
            include: {
                VarianteProducto: {
                    include: {
                        Aroma: true
                    }},
                Tipo_de_productos: true,
                ImagenProducto: true
            }
        });
    }

    async updateProductState(idProducto: number, estado:string){
        return await prisma.producto.update({
            where: {id: idProducto},
            data: {estadoProducto: estado}
        })
    }

    async actualizarReseniasYPuntuacion(idProducto: number, nuevaPuntuacion: number){
        return await prisma.producto.update({
            where: {id: idProducto},
            data: {
                puntuacionTotal: nuevaPuntuacion,
                cantidadResenias: {increment: 1}
            }
        })
    }
}