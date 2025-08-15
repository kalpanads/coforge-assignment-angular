import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AppStore } from 'shared';

export const authGuard: CanActivateFn = () => {
  const store = inject(AppStore);
  const router = inject(Router);
  if (!store.user()) { router.navigateByUrl('/login'); return false; }
  return true;
};
