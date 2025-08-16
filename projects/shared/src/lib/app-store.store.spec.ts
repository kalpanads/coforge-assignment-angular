import { TestBed } from '@angular/core/testing';
import { AppStore, SessionUser, AppState } from './app-store.store';
import { Signal } from '@angular/core';
import { patchState } from '@ngrx/signals';

type TestAppStore = {
  readonly user: Signal<SessionUser | null>;
  readonly permissions: Signal<string[]>;
  readonly theme: Signal<'light' | 'dark'>;
  setUser(u: SessionUser | null): void;
  loadSession(): void;
  toggleTheme(): void;
};

describe('AppStore', () => {
  let store: TestAppStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppStore],
    });
    store = TestBed.inject(AppStore);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('setUser', () => {
    it('should set user and derive admin permissions', () => {
      const user: SessionUser = { id: '1', name: 'Admin', role: 'admin', token: 'token' };
      store.setUser(user);
      expect(store.user()).toEqual(user);
      expect(store.permissions()).toEqual(['can:view:admin-widgets', 'can:edit:users']);
      expect(localStorage.getItem('session')).toEqual(JSON.stringify(user));
    });

    it('should set user and derive viewer permissions', () => {
      const user: SessionUser = { id: '2', name: 'Viewer', role: 'viewer', token: 'token' };
      store.setUser(user);
      expect(store.user()).toEqual(user);
      expect(store.permissions()).toEqual(['can:view:basic']);
      expect(localStorage.getItem('session')).toEqual(JSON.stringify(user));
    });

    it('should clear user and permissions', () => {
      store.setUser(null);
      expect(store.user()).toBeNull();
      expect(store.permissions()).toEqual([]);
      expect(localStorage.getItem('session')).toEqual('null');
    });
  });

  describe('loadSession', () => {
    it('should load user from localStorage', () => {
      const user: SessionUser = { id: '1', name: 'Admin', role: 'admin', token: 'token' };
      localStorage.setItem('session', JSON.stringify(user));
      store.loadSession();
      expect(store.user()).toEqual(user);
    });

    it('should load theme from localStorage', () => {
      localStorage.setItem('theme', 'dark');
      store.loadSession();
      expect(store.theme()).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });
  });

  describe('toggleTheme', () => {
    it('should toggle theme from light to dark', () => {
      patchState(store as any, { theme: 'light' });
      store.toggleTheme();
      expect(store.theme()).toBe('dark');
      expect(localStorage.getItem('theme')).toBe('dark');
      expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    });

    it('should toggle theme from dark to light', () => {
      patchState(store as any, { theme: 'dark' });
      store.toggleTheme();
      expect(store.theme()).toBe('light');
      expect(localStorage.getItem('theme')).toBe('light');
      expect(document.documentElement.getAttribute('data-theme')).toBe('light');
    });
  });
});
