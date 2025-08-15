// projects/shared/src/lib/app-store.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';

export type Role = 'admin' | 'viewer';
export interface SessionUser { id: string; name: string; role: Role; token: string | null; }
export interface AppState {
  user: SessionUser | null;
  permissions: string[];
  theme: 'light' | 'dark';
}

const initial: AppState = { user: null, permissions: [], theme: 'light' };

export const AppStore = signalStore(
  { providedIn: 'root' },
  withState(initial),
  withMethods((store) => ({
    setUser(u: SessionUser | null) {
      patchState(store, { user: u, permissions: derivePerms(u) });
      localStorage.setItem('session', JSON.stringify(u));
    },
    loadSession() {
      const raw = localStorage.getItem('session'); if (raw) this.setUser(JSON.parse(raw));
      const t = (localStorage.getItem('theme') as 'light'|'dark') || 'light';
      patchState(store, { theme: t });
      document.documentElement.setAttribute('data-theme', t);
    },
    toggleTheme() {
      const t = store.theme() === 'light' ? 'dark' : 'light';
      patchState(store, { theme: t });
      document.documentElement.setAttribute('data-theme', t);
      localStorage.setItem('theme', t);
    }
  }))
);

function derivePerms(u: SessionUser | null): string[] {
  if (!u) return [];
  return u.role === 'admin' ? ['can:view:admin-widgets', 'can:edit:users'] : ['can:view:basic'];
}
