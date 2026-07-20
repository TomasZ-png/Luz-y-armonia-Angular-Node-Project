import { VarianteProducto } from '@prisma/client';
import { Aroma } from './aroma.model';
export interface Producto {
    id?: number;
    nombre: string;
    idAroma: number;
    precio: number;
    mililitros?: number;
    idTamanio: number;
    premium: boolean;
    variantes: VarianteProducto[];
}