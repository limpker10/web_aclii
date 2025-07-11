import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditCreateComponent } from './audit-create.component';

describe('AuditCreateComponent', () => {
  let component: AuditCreateComponent;
  let fixture: ComponentFixture<AuditCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
