// users.service.ts
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
export interface RemoteUser { id: number; login: string; avatar_url: string; html_url: string; }
@Injectable({ providedIn: 'root' })
export class UsersService {
  private http = inject(HttpClient);
  list(){ return this.http.get<RemoteUser[]>('https://api.github.com/users?per_page=20'); }
}
