import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompraFacturaComponent } from './compra-factura.component';

describe('CompraFacturaComponent', () => {
  let component: CompraFacturaComponent;
  let fixture: ComponentFixture<CompraFacturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompraFacturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompraFacturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
