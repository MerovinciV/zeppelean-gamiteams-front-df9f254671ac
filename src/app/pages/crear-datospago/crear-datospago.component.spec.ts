import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearDatospagoComponent } from './crear-datospago.component';

describe('CrearDatospagoComponent', () => {
  let component: CrearDatospagoComponent;
  let fixture: ComponentFixture<CrearDatospagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearDatospagoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearDatospagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
