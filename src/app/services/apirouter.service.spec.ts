import { TestBed } from '@angular/core/testing';

import { APIRouterService } from './apirouter.service';

describe('APIRouterService', () => {
  let service: APIRouterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIRouterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
