import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartComponent } from './chart.component';
import { SimpleChange } from '@angular/core';

describe('ChartComponent', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create chart when data is provided', () => {
    const chartData = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Sales',
        data: [100, 200, 150]
      }]
    };

    component.data = chartData;
    fixture.detectChanges();

    component.ngOnChanges({
      data: new SimpleChange(null, chartData, true)
    });

    fixture.detectChanges();
    expect(component['chart']).toBeDefined();
  });

  it('should destroy chart on component destruction', () => {
    const chartData = {
      labels: ['Jan', 'Feb', 'Mar'],
      datasets: [{
        label: 'Sales',
        data: [100, 200, 150]
      }]
    };

    component.data = chartData;
    fixture.detectChanges();

    component.ngOnChanges({
      data: new SimpleChange(null, chartData, true)
    });
    fixture.detectChanges();

    const destroySpy = spyOn(component['chart']!, 'destroy');
    component.ngOnDestroy();
    expect(destroySpy).toHaveBeenCalled();
  });
});
