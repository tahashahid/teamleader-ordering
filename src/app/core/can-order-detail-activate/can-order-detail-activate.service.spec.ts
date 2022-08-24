import { TestBed } from '@angular/core/testing';

import { CanOrderDetailActivateService } from './can-order-detail-activate.service';

describe('CanOrderDetailActivateService', () => {
  let service: CanOrderDetailActivateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CanOrderDetailActivateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
