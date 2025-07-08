import { TestBed } from '@angular/core/testing';

import { AuditQuestionService } from './audit-question.service';

describe('AuditQuestionService', () => {
  let service: AuditQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuditQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
