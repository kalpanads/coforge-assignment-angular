import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginPage } from './login.page';
import { AuthService } from './auth.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceMock: Partial<AuthService>;
  let routerMock: Partial<Router>;

  beforeEach(async () => {
    authServiceMock = {
      login: jasmine.createSpy('login'),
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl'),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginPage, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.login and router.navigateByUrl on valid form submission', () => {
    component.form.setValue({ name: 'testuser', role: 'admin' });
    component.submit();
    expect(authServiceMock.login).toHaveBeenCalledWith('testuser', 'admin');
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/');
  });
});
