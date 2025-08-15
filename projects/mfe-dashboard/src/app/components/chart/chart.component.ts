import { Component, Input, ViewChild, ElementRef, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  template: `<canvas #canvas width="400" height="200"></canvas>`,
})
export class ChartComponent implements OnChanges, OnDestroy {
  @Input() data: any;
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  
  private chart: Chart | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && this.data) {
      this.createChart();
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
          data: this.data,
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
