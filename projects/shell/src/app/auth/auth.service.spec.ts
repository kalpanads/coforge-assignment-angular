import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AppStore } from 'shared';

describe('AuthService', () => {
  let service: AuthService;
  let appStoreMock: { setUser: jasmine.Spy };

  beforeEach(() => {
    appStoreMock = {
      setUser: jasmine.createSpy('setUser'),
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AppStore, useValue: appStoreMock },
      ],
    });
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call store.setUser with user details on login', () => {
    const name = 'testuser';
    const role = 'admin';
    service.login(name, role);
    expect(appStoreMock.setUser).toHaveBeenCalledWith(
      jasmine.objectContaining({
        name,
        role,
      })
    );
  });

  it('should call store.setUser with null on logout', () => {
    service.logout();
    expect(appStoreMock.setUser).toHaveBeenCalledWith(null);
  });
});
