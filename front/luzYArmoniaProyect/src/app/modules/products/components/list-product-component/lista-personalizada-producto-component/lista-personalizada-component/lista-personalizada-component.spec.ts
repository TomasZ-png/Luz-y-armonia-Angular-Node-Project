import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPersonalizadaComponent } from './lista-personalizada-component';

describe('ListaPersonalizadaComponent', () => {
  let component: ListaPersonalizadaComponent;
  let fixture: ComponentFixture<ListaPersonalizadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPersonalizadaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPersonalizadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
