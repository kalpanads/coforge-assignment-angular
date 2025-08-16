import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  template:` <canvas #canvas width="400" height="200"></canvas>`,
})
export class ChartComponent implements OnChanges, OnDestroy, AfterViewInit {
  @Input() data: any;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | undefined;

  ngAfterViewInit(): void {
    if (this.data) {
      this.createChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange && this.chart) {
      this.chart.data.labels = this.data.labels;
      this.chart.data.datasets = this.data.datasets;
      this.chart.update();
    }
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    if (this.canvas) {
      const context = this.canvas.nativeElement.getContext('2d');
      if (context) {
        this.chart = new Chart(context, {
          type: 'bar',
          data: {
            labels: this.data.labels,
            datasets: this.data.datasets,
          },
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          },
        });
      }
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}