import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AppStore } from 'shared';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { signal, WritableSignal } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

type AppStoreMock = { user: WritableSignal<any | null>, toggleTheme: jasmine.Spy };

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let appStoreMock: AppStoreMock;
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    appStoreMock = {
      user: signal(null),
      toggleTheme: jasmine.createSpy('toggleTheme'),
    };

    authServiceMock = {
      logout: jasmine.createSpy('logout'),
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, NoopAnimationsModule],
      providers: [
        { provide: AppStore, useValue: appStoreMock },
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call store.toggleTheme on theme toggle', () => {
    component.toggleTheme();
    expect(appStoreMock.toggleTheme).toHaveBeenCalled();
  });

  it('should call authService.logout and router.navigateByUrl on logout', () => {
    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
