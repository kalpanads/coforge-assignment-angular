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
  templateUrl: './users.page.html',
})
export class UsersPage implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(UsersStore);
  private app = inject(AppStore);
  items: Signal<any[]> = this.store.items;
  isAdmin = () => this.app.user()?.role === 'admin';
  form = this.fb.group({ login: ['', [Validators.required, Validators.minLength(3)]] });
  get login() { return this.form.controls.login; }
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
