import { TestBed } from '@angular/core/testing';
import { DashboardService } from './dashboard.service';
import { dummyData, chartData } from './dummy-data';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return dashboard data', (done) => {
    service.getDashboardData().subscribe(data => {
      expect(data).toEqual(dummyData);
      done();
    });
  });

  it('should return chart data', (done) => {
    service.getChartData().subscribe(data => {
      expect(data).toEqual(chartData);
      done();
    });
  });
});
