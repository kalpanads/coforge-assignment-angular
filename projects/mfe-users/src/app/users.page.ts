// users.page.ts
import { Component, inject, OnInit, Signal } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { UsersStore } from './users.store';
import { AppStore } from 'shared';

@Component({
  standalone: true,
  selector: 'mfe-users-page',
  imports: [ReactiveFormsModule, NgIf, NgFor],
  template: `
<div class="container py-3">
  <div class="d-flex justify-content-between align-items-center mb-3">
    <h2 class="m-0">User Management</h2>
    <button class="btn btn-secondary" (click)="refresh()">Refresh</button>
  </div>

  <form class="card p-3 mb-4" [formGroup]="form" (ngSubmit)="submit()" aria-describedby="createHelp">
    <div class="mb-3">
      <label for="login" class="form-label">Username</label>
      <input id="login" class="form-control" formControlName="login" required aria-required="true"/>
      <div *ngIf="form.controls.login.invalid && form.controls.login.touched" class="text-danger">
        Username is required (min 3).
      </div>
      <div id="createHelp" class="form-text">Create local user (admin only).</div>
    </div>
    <button class="btn btn-primary" type="submit" [disabled]="!form.valid || !isAdmin()">Create</button>
    <span *ngIf="!isAdmin()" class="ms-2 badge text-bg-warning">Admins only</span>
  </form>

  <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
    <div class="col" *ngFor="let u of items()">
      <div class="card h-100">
        <div class="card-body d-flex align-items-center gap-3">
          <img [src]="u.avatar_url || 'https://placehold.co/64'" alt="" width="48" height="48" class="rounded-circle"/>
          <div class="flex-grow-1">
            <div class="fw-semibold">{{u.login}}</div>
            <a *ngIf="u.html_url" [href]="u.html_url" target="_blank" rel="noopener">Profile</a>
          </div>
          <button class="btn btn-outline-primary btn-sm" *ngIf="isAdmin()" (click)="edit(u)">Edit</button>
        </div>
      </div>
    </div>
  </div>
</div>`})
export class UsersPage implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(UsersStore);
  private app = inject(AppStore);
  items: Signal<any[]> = this.store.items;
  isAdmin = () => this.app.user()?.role === 'admin';
  form = this.fb.group({ login: ['', [Validators.required, Validators.minLength(3)]] });
  ngOnInit(){ this.refresh(); }
  refresh(){ this.store.refresh(); }
  submit(){ if(this.form.valid && this.isAdmin()){ this.store.createLocal(this.form.value.login!); this.form.reset(); } }
  edit(user: any) {
    const login = prompt('Enter new login', user.login);
    if (login) {
      this.store.update({ ...user, login });
    }
  }
}
