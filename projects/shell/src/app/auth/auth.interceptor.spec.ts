import { TestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor';
import { AppStore } from 'shared';
import { signal, WritableSignal } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

type AppStoreMock = { user: WritableSignal<any | null> };

describe('authInterceptor', () => {
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let appStoreMock: AppStoreMock;

  beforeEach(() => {
    appStoreMock = {
      user: signal(null),
    };

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AppStore, useValue: appStoreMock },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add an Authorization header when a token is present', () => {
    const token = 'test-token';
    appStoreMock.user.set({ token });

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(true);
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
  });

  it('should not add an Authorization header when a token is not present', () => {
    appStoreMock.user.set(null);

    httpClient.get('/test').subscribe();

    const httpRequest = httpMock.expectOne('/test');
    expect(httpRequest.request.headers.has('Authorization')).toEqual(false);
  });
});
