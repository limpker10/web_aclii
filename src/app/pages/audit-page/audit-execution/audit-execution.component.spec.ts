import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditExecutionComponent } from './audit-execution.component';

describe('AuditExecutionComponent', () => {
  let component: AuditExecutionComponent;
  let fixture: ComponentFixture<AuditExecutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditExecutionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditExecutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
