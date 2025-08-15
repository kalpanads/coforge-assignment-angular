import { Component, inject } from '@angular/core';
import { AppStore } from 'shared';
import { HasRoleDirective } from 'shared';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mfe-header',
  standalone: true,
  imports: [HasRoleDirective, RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  private store = inject(AppStore);
  private authService = inject(AuthService);
  private router = inject(Router);
  user = this.store.user;
  toggleTheme() { this.store.toggleTheme(); }
  logout() { this.authService.logout();
    this.router.navigateByUrl('/');
   }
}
