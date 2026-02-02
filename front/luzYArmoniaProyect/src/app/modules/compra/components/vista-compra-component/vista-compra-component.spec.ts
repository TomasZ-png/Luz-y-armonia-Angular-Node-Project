import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VistaCompraComponent } from './vista-compra-component';

describe('VistaCompraComponent', () => {
  let component: VistaCompraComponent;
  let fixture: ComponentFixture<VistaCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VistaCompraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VistaCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
