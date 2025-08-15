import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { dummyData, chartData } from './dummy-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  getDashboardData() {
    return of(dummyData);
  }

  getChartData() {
    return of(chartData);
  }
}
