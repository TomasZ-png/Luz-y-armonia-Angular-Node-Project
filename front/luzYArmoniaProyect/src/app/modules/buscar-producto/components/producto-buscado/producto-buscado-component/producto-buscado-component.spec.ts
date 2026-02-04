import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoBuscadoComponent } from './producto-buscado-component';

describe('ProductoBuscadoComponent', () => {
  let component: ProductoBuscadoComponent;
  let fixture: ComponentFixture<ProductoBuscadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoBuscadoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoBuscadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
