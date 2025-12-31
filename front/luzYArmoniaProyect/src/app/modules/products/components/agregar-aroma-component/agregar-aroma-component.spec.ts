import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarAromaComponent } from './agregar-aroma-component';

describe('AgregarAromaComponent', () => {
  let component: AgregarAromaComponent;
  let fixture: ComponentFixture<AgregarAromaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarAromaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarAromaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
