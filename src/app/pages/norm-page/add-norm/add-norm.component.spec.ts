import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNormComponent } from './add-norm.component';

describe('AddNormComponent', () => {
  let component: AddNormComponent;
  let fixture: ComponentFixture<AddNormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddNormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
