import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNormComponent } from './view-norm.component';

describe('ViewNormComponent', () => {
  let component: ViewNormComponent;
  let fixture: ComponentFixture<ViewNormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewNormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewNormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
