import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersPage } from './users.page';
import { UsersStore } from './users.store';
import { AppStore } from 'shared';
import { signal, WritableSignal, Signal } from '@angular/core';

interface UsersStoreMock {
  items: Signal<any[]>;
  refresh: jasmine.Spy;
  createLocal: jasmine.Spy;
  update: jasmine.Spy;
}

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let usersStoreMock: UsersStoreMock;
  let appStoreMock: { user: WritableSignal<{ role: string } | null> };

  beforeEach(async () => {
    usersStoreMock = {
      items: signal([]),
      refresh: jasmine.createSpy('refresh'),
      createLocal: jasmine.createSpy('createLocal'),
      update: jasmine.createSpy('update'),
    };

    appStoreMock = {
      user: signal<{ role: string } | null>({ role: 'admin' }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, UsersPage],
      providers: [
        { provide: UsersStore, useValue: usersStoreMock },
        { provide: AppStore, useValue: appStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should refresh users on init', () => {
    expect(usersStoreMock.refresh).toHaveBeenCalled();
  });

  it('should call store.createLocal on valid form submission when user is admin', () => {
    component.login.setValue('testuser');
    component.submit();
    expect(usersStoreMock.createLocal).toHaveBeenCalledWith('testuser');
    expect(component.form.pristine).toBe(true);
  });

  it('should not call store.createLocal on invalid form submission', () => {
    component.login.setValue('te');
    component.submit();
    expect(usersStoreMock.createLocal).not.toHaveBeenCalled();
  });

  it('should not call store.createLocal if user is not admin', () => {
    appStoreMock.user.set({ role: 'user' });
    component.login.setValue('testuser');
    component.submit();
    expect(usersStoreMock.createLocal).not.toHaveBeenCalled();
  });

  it('should call store.update when editing a user with a new login', () => {
    const user = { id: 1, login: 'olduser' };
    const newLogin = 'newuser';
    spyOn(window, 'prompt').and.returnValue(newLogin);
    component.edit(user);
    expect(usersStoreMock.update).toHaveBeenCalledWith({ ...user, login: newLogin });
  });

  it('should not call store.update when editing a user without a new login', () => {
    const user = { id: 1, login: 'olduser' };
    spyOn(window, 'prompt').and.returnValue(null);
    component.edit(user);
    expect(usersStoreMock.update).not.toHaveBeenCalled();
  });
});
