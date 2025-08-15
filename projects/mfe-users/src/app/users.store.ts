// users.store.ts
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { UsersService, RemoteUser } from './users.service';
import { AppStore, EventBus } from 'shared';

interface UsersState { loading: boolean; items: RemoteUser[]; }
const initial: UsersState = { loading: false, items: [] };

export const UsersStore = signalStore({ providedIn: 'root' }, withState(initial), withMethods((s) => {
  const api = inject(UsersService); const app = inject(AppStore); const bus = inject(EventBus);
  return {
    async refresh() {
      patchState(s, { loading: true });
      const items = await api.list().toPromise().catch(() => []);
      patchState(s, { loading: false, items: items || [] });
    },
    createLocal(login: string) {
      if (app.user()?.role !== 'admin') return;
      const created = { id: Date.now(), login, avatar_url: '', html_url: '' } as RemoteUser;
      patchState(s, { items: [created, ...s.items()] });
      bus.emit({ type: 'dashboard.refresh' });
    },
    update(user: RemoteUser) {
      if (app.user()?.role !== 'admin') return;
      patchState(s, (state) => ({ items: state.items.map(u => u.id === user.id ? user : u) }));
      bus.emit({ type: 'dashboard.refresh' });
    }
  };
}));
