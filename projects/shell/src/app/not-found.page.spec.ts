import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the 404 message', () => {
    const pageElement: HTMLElement = fixture.nativeElement;
    const h1 = pageElement.querySelector('h1');
    expect(h1?.textContent).toContain('404 - Not Found');
  });
});
