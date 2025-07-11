import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditListCoordinadorComponent } from './audit-list-coordinador.component';

describe('AuditListCoordinadorComponent', () => {
  let component: AuditListCoordinadorComponent;
  let fixture: ComponentFixture<AuditListCoordinadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuditListCoordinadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuditListCoordinadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
