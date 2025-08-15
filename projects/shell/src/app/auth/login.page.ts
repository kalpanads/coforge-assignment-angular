import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
<div class="container py-5" style="max-width: 460px;">
  <h3 class="mb-3">Sign in</h3>
  <form [formGroup]="form" (ngSubmit)="submit()">
    <div class="mb-3">
      <label class="form-label" for="name">Name</label>
      <input id="name" class="form-control" formControlName="name" required />
    </div>
    <div class="mb-3">
      <label class="form-label" for="role">Role</label>
      <select id="role" class="form-select" formControlName="role" required>
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
    <button class="btn btn-primary w-100" type="submit" [disabled]="form.invalid">Login</button>
  </form>
</div>`})
export class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  form = this.fb.group({ name: ['', Validators.required], role: ['viewer', Validators.required] });

  submit() { 
    const v = this.form.value as any; 
    this.auth.login(v.name, v.role);
     this.router.navigateByUrl('/'); 
    }
}
