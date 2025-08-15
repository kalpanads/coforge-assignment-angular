import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AppStore } from 'shared';

export const roleGuard = (roles: ('admin'|'viewer')[]): CanActivateFn => () => {
  const u = inject(AppStore).user();
  return !!u && roles.includes(u.role);
};
