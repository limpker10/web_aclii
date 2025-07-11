import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoordinadorPageComponent } from './coordinador-page.component';

describe('CoordinadorPageComponent', () => {
  let component: CoordinadorPageComponent;
  let fixture: ComponentFixture<CoordinadorPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoordinadorPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoordinadorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
