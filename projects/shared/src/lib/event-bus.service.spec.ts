import { TestBed } from '@angular/core/testing';
import { EventBus, AppEvent } from './event-bus.service';

describe('EventBus', () => {
  let service: EventBus;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventBus],
    });
    service = TestBed.inject(EventBus);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit and receive events', (done) => {
    const testEvent: AppEvent = { type: 'user.created', payload: { id: '1', name: 'test' } };

    service.events$.subscribe(event => {
      expect(event).toEqual(testEvent);
      done();
    });

    service.emit(testEvent);
  });
});
