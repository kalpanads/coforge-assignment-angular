import { TestBed } from '@angular/core/testing';
import { UsersStore } from './users.store';
import { UsersService, RemoteUser } from './users.service';
import { AppStore, EventBus } from 'shared';
import { of, throwError } from 'rxjs';
import { signal, WritableSignal, Signal } from '@angular/core';

type UsersServiceMock = Pick<UsersService, 'list'>;
type AppStoreMock = { user: WritableSignal<{ role: string } | null> };
type EventBusMock = Pick<EventBus, 'emit'>;

import { patchState } from '@ngrx/signals';

type TestUsersStore = {
  readonly items: Signal<RemoteUser[]>;
  readonly loading: Signal<boolean>;
  refresh(): Promise<void>;
  createLocal(login: string): void;
  update(user: RemoteUser): void;
};

describe('UsersStore', () => {
  let store: TestUsersStore;
  let usersServiceMock: UsersServiceMock;
  let appStoreMock: AppStoreMock;
  let eventBusMock: EventBusMock;

  beforeEach(() => {
    usersServiceMock = {
      list: jasmine.createSpy('list'),
    };

    appStoreMock = {
      user: signal<{ role: string } | null>({ role: 'admin' }),
    };

    eventBusMock = {
      emit: jasmine.createSpy('emit'),
    };

    TestBed.configureTestingModule({
      providers: [
        UsersStore,
        { provide: UsersService, useValue: usersServiceMock },
        { provide: AppStore, useValue: appStoreMock },
        { provide: EventBus, useValue: eventBusMock },
      ],
    });

    store = TestBed.inject(UsersStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('refresh', () => {
    it('should fetch and set users', async () => {
      const dummyUsers: RemoteUser[] = [{ id: 1, login: 'test', avatar_url: '', html_url: '' }];
      (usersServiceMock.list as jasmine.Spy).and.returnValue(of(dummyUsers));
      await store.refresh();
      expect(store.items()).toEqual(dummyUsers);
      expect(store.loading()).toBe(false);
    });

    it('should handle API errors gracefully', async () => {
      (usersServiceMock.list as jasmine.Spy).and.returnValue(throwError(() => new Error('API Error')));
      await store.refresh();
      expect(store.items()).toEqual([]);
      expect(store.loading()).toBe(false);
    });
  });

  describe('createLocal', () => {
    it('should add a new user if the user is an admin', () => {
      store.createLocal('newuser');
      expect(store.items().length).toBe(1);
      expect(store.items()[0].login).toBe('newuser');
      expect(eventBusMock.emit).toHaveBeenCalledWith({ type: 'dashboard.refresh' });
    });

    it('should not add a new user if the user is not an admin', () => {
      appStoreMock.user.set({ role: 'user' });
      store.createLocal('newuser');
      expect(store.items().length).toBe(0);
    });
  });

  describe('update', () => {
    it('should update an existing user if the user is an admin', () => {
      const initialUser = { id: 1, login: 'olduser', avatar_url: '', html_url: '' };
      patchState(store as any, { items: [initialUser] });
      const updatedUser = { ...initialUser, login: 'newuser' };
      store.update(updatedUser);
      expect(store.items()[0].login).toBe('newuser');
      expect(eventBusMock.emit).toHaveBeenCalledWith({ type: 'dashboard.refresh' });
    });

    it('should not update a user if the user is not an admin', () => {
      const initialUser = { id: 1, login: 'olduser', avatar_url: '', html_url: '' };
      patchState(store as any, { items: [initialUser] });
      appStoreMock.user.set({ role: 'user' });
      const updatedUser = { ...initialUser, login: 'newuser' };
      store.update(updatedUser);
      expect(store.items()[0].login).toBe('olduser');
    });
  });
});
