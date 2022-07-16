import { TestBed } from '@angular/core/testing';

import { TicketFilterService } from './ticket-filter.service';

describe('TicketFilterService', () => {
  let service: TicketFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
