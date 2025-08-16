import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.page.html',
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private auth = inject(AuthService);
  form = this.fb.group({ name: ['', Validators.required], role: ['viewer', Validators.required] });

  get name() {
    return this.form.controls.name;
  }

  submit() {
    const v = this.form.value as any;
    this.auth.login(v.name, v.role);
    this.router.navigateByUrl('/');
  }
}
