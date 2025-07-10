import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditsListComponent } from './audits-list.component';

describe('AuditsListComponent', () => {
  let component: AuditsListComponent;
  let fixture: ComponentFixture<AuditsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
