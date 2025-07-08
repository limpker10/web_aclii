import { TestBed } from '@angular/core/testing';

import { AuditStatusService } from './audit-status.service';

describe('AuditStatusService', () => {
  let service: AuditStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
