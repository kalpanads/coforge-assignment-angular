// projects/shared/src/lib/event-bus.service.ts
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type AppEvent =
  | { type: 'user.created'; payload: { id: string; name: string } }
  | { type: 'users.refreshed' }
  | { type: 'dashboard.refresh' };

@Injectable({ providedIn: 'root' })
export class EventBus {
  private s = new Subject<AppEvent>();
  events$ = this.s.asObservable();
  emit(e: AppEvent) { this.s.next(e); }
}
