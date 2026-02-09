import { Component } from '@angular/core';
import { content } from '@primeng/themes/aura/accordion';
import { AccordionModule } from 'primeng/accordion';


@Component({
  selector: 'app-preguntas-frecuentes-component',
  imports: [AccordionModule],
  templateUrl: './preguntas-frecuentes-component.html',
  styleUrl: './preguntas-frecuentes-component.css',
  standalone: true,
})
export class PreguntasFrecuentesComponent {

  tabs: any[] = [
    {
      title: '¿Cómo puedo realizar una compra?',
      content: 'Para realizar una compra, simplemente navega por nuestro catálogo de productos, elige comprar si te gusto, y luego de visualizar el resumen de compra, pagando con Mercado Pago tu compra será un exito!. Tambien podes añadir productos a tu carrito y comprar todo junto de la misma manera!.'
    },
    {
      title: '¿Cuáles son los métodos de pago disponibles?',
      content: 'Aceptamos pagos a través de Mercado Pago, lo que te permite utilizar tarjetas de crédito, débito y otros métodos de pago disponibles en la plataforma.'
    },
    {
      title: '¿Cuánto tiempo tarda el envío?',
      content: 'El tiempo de envío puede variar según tu ubicación y el método de envío seleccionado. Por lo general, los pedidos se procesan y envían dentro de 1 a 3 días hábiles.'
    },
    {
      title: 'Tipos de envío',
      content: 'Ofrecemos diferentes opciones de envio para la comodidad del cliente. Ofrecemos envio a domicilio mediante correo, punto de encuentro en las ferias proximas que realizaremos, y punto de encuentro o retirando en nuestro local.'
    }
  ];

}
