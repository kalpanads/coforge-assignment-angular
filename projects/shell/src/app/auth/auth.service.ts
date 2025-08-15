import { Injectable, inject } from '@angular/core';
import { AppStore, Role, SessionUser } from 'shared';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private store = inject(AppStore);
  login(name: string, role: Role) {
    const token = btoa(`${name}:${role}:${Date.now()}`);
    const user: SessionUser = { id: crypto.randomUUID(), name, role, token };
    this.store.setUser(user);
  }
  logout() { this.store.setUser(null); }
}
