import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AppStore } from 'shared';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AppStore).user()?.token;
  return next(token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req);
};
