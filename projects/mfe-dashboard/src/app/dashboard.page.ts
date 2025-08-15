import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CardComponent } from './components/card/card.component';

@Component({
  standalone: true,
  selector: 'mfe-dashboard-page',
  imports: [CommonModule, DashboardComponent, CardComponent],
  template: `<app-dashboard></app-dashboard>`,
})
export class DashboardPage {}
