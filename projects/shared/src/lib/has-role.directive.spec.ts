import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HasRoleDirective } from './has-role.directive';
import { AppStore } from './app-store.store';
import { signal, WritableSignal } from '@angular/core';

@Component({
  template: `
    <div *hasRole="['admin']">Admin content</div>
    <div *hasRole="['viewer']">Viewer content</div>
  `
})
class TestComponent {}

type AppStoreMock = { user: WritableSignal<any | null> };

describe('HasRoleDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let appStoreMock: AppStoreMock;

  beforeEach(() => {
    appStoreMock = {
      user: signal(null)
    };

    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HasRoleDirective],
      providers: [{ provide: AppStore, useValue: appStoreMock }]
    });

    fixture = TestBed.createComponent(TestComponent);
  });

  it('should show content for admin role', () => {
    appStoreMock.user.set({ role: 'admin' });
    fixture.detectChanges();
    const adminContent = fixture.debugElement.query(By.css('div'));
    expect(adminContent.nativeElement.textContent).toContain('Admin content');
  });

  it('should show content for viewer role', () => {
    appStoreMock.user.set({ role: 'viewer' });
    fixture.detectChanges();
    const viewerContent = fixture.debugElement.queryAll(By.css('div'));
    expect(viewerContent.length).toBe(1);
    expect(viewerContent[0].nativeElement.textContent).toContain('Viewer content');
  });

  it('should not show content for other roles', () => {
    appStoreMock.user.set({ role: 'other' });
    fixture.detectChanges();
    const content = fixture.debugElement.queryAll(By.css('div'));
    expect(content.length).toBe(0);
  });

  it('should not show content when user is not logged in', () => {
    appStoreMock.user.set(null);
    fixture.detectChanges();
    const content = fixture.debugElement.queryAll(By.css('div'));
    expect(content.length).toBe(0);
  });
});
