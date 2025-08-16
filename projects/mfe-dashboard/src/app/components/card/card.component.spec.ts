import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';

describe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and content', () => {
    const title = 'Test Title';
    const content = 'Test Content';
    component.title = title;
    component.content = content;
    fixture.detectChanges();

    const cardElement: HTMLElement = fixture.nativeElement;
    const titleElement = cardElement.querySelector('.card-title');
    const contentElement = cardElement.querySelector('.card-text');

    expect(titleElement?.textContent).toContain(title);
    expect(contentElement?.textContent).toContain(content);
  });
});
