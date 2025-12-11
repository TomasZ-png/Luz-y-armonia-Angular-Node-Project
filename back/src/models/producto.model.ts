import { Aroma } from './aroma.model';
export interface Producto {
    id?: number;
    nombre: string;
    idAroma: number;
    precio: number;
    stock: number;
    mililitros?: number;
    idTamanio: number;
    premium: boolean;

    aroma?: Aroma
}