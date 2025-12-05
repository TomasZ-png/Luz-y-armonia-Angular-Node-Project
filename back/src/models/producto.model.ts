import { Aroma } from './aroma.model';
export interface Producto {
    id?: number;
    nombre: string;
    idAroma: number;
    precio: number;
    stock: number;
    militros?: number;
    idTamanio: number;
    premium: boolean;

    aroma?: Aroma
}