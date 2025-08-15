import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  getDashboard() {
    const kpis = [{ title: 'Users', value: 1024 }, { title: 'Active', value: 311 }, { title: 'Errors', value: 3 }, { title: 'Latency (ms)', value: 128 }];
    const lineData = { labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], datasets: [{ label:'Visits', data:[120,180,150,220,260,210,300], fill:false }] };
    return of({ kpis, lineData });
  }
}
