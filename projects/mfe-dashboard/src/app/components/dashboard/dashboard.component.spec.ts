import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from '../../dashboard.service';
import { AppStore } from 'shared';
import { of } from 'rxjs';
import { signal, WritableSignal } from '@angular/core';

type AppStoreMock = { user: WritableSignal<any | null> };

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let dashboardServiceMock: Partial<DashboardService>;
  let appStoreMock: AppStoreMock;

  beforeEach(async () => {
    dashboardServiceMock = {
      getDashboardData: jest.fn().mockReturnValue(of([])),
      getChartData: jest.fn().mockReturnValue(of({})),
    };

    appStoreMock = {
      user: signal(null),
    };

    await TestBed.configureTestingModule({
      imports: [DashboardComponent],
      providers: [
        { provide: DashboardService, useValue: dashboardServiceMock },
        { provide: AppStore, useValue: appStoreMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dashboard and chart data on init', () => {
    expect(dashboardServiceMock.getDashboardData).toHaveBeenCalled();
    expect(dashboardServiceMock.getChartData).toHaveBeenCalled();
  });
});
