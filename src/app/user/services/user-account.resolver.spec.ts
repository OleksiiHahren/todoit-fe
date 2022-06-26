import { TestBed } from '@angular/core/testing';

import { UserAccountResolver } from './user-account.resolver';

describe('UserAccountResolver', () => {
  let resolver: UserAccountResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(UserAccountResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
