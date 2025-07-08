import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NormPageComponent } from './norm-page.component';

describe('NormPageComponent', () => {
  let component: NormPageComponent;
  let fixture: ComponentFixture<NormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NormPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
