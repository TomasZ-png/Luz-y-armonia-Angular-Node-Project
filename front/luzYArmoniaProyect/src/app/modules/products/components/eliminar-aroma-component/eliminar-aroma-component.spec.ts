import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarAromaComponent } from './eliminar-aroma-component';

describe('EliminarAromaComponent', () => {
  let component: EliminarAromaComponent;
  let fixture: ComponentFixture<EliminarAromaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarAromaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarAromaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
