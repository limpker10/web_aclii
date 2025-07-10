import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditStatusComponent } from './audit-status.component';

describe('AuditStatusComponent', () => {
  let component: AuditStatusComponent;
  let fixture: ComponentFixture<AuditStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
