import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AppStore } from 'shared';
import { signal, WritableSignal } from '@angular/core';

type AppStoreMock = { user: WritableSignal<any | null> };

describe('authGuard', () => {
  let appStoreMock: AppStoreMock;
  let routerMock: Partial<Router>;

  beforeEach(() => {
    appStoreMock = {
      user: signal(null),
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AppStore, useValue: appStoreMock },
        { provide: Router, useValue: routerMock },
      ],
    });
  });

  it('should allow activation when user is logged in', () => {
    appStoreMock.user.set({});
    const guard = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(guard).toBe(true);
  });

  it('should prevent activation and navigate to login when user is not logged in', () => {
    appStoreMock.user.set(null);
    const guard = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));
    expect(guard).toBe(false);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/login');
  });
});
