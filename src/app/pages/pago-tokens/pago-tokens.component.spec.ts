import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoTokensComponent } from './pago-tokens.component';

describe('PagoTokensComponent', () => {
  let component: PagoTokensComponent;
  let fixture: ComponentFixture<PagoTokensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagoTokensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PagoTokensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
