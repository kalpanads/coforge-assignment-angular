import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../dashboard.service';
import { CardComponent } from '../card/card.component';
import { AppStore, HasRoleDirective } from 'shared';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardComponent, HasRoleDirective, ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any[] | undefined;
  chartData: any;
  private store = inject(AppStore);
  user = this.store.user;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe((data) => {
      this.dashboardData = data;
    });
    this.dashboardService.getChartData().subscribe((data) => {
      this.chartData = data;
    });
  }
}
