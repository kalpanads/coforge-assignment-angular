import { TestBed } from '@angular/core/testing';
import { roleGuard } from './role.guard';
import { AppStore } from 'shared';
import { signal, WritableSignal } from '@angular/core';

type AppStoreMock = { user: WritableSignal<any | null> };

describe('roleGuard', () => {
  let appStoreMock: AppStoreMock;

  beforeEach(() => {
    appStoreMock = {
      user: signal(null),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: AppStore, useValue: appStoreMock },
      ],
    });
  });

  it('should allow activation when user has the required role', () => {
    appStoreMock.user.set({ role: 'admin' });
    const guard = TestBed.runInInjectionContext(() => roleGuard(['admin'])({} as any, {} as any));
    expect(guard).toBe(true);
  });

  it('should prevent activation when user does not have the required role', () => {
    appStoreMock.user.set({ role: 'viewer' });
    const guard = TestBed.runInInjectionContext(() => roleGuard(['admin'])({} as any, {} as any));
    expect(guard).toBe(false);
  });

  it('should prevent activation when user is not logged in', () => {
    appStoreMock.user.set(null);
    const guard = TestBed.runInInjectionContext(() => roleGuard(['admin'])({} as any, {} as any));
    expect(guard).toBe(false);
  });
});
