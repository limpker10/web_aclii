import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormStepperComponent } from './norm-stepper.component';

describe('NormStepperComponent', () => {
  let component: NormStepperComponent;
  let fixture: ComponentFixture<NormStepperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormStepperComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormStepperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
