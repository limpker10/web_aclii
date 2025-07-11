import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormEditComponent } from './norm-edit.component';

describe('NormEditComponent', () => {
  let component: NormEditComponent;
  let fixture: ComponentFixture<NormEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
