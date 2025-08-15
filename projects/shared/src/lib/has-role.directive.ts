import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { AppStore } from './app-store.store';

@Directive({ selector: '[hasRole]', standalone: true })
export class HasRoleDirective {
  private vcr = inject(ViewContainerRef);
  private tpl = inject(TemplateRef<unknown>);
  private store = inject(AppStore);
  @Input() set hasRole(roles: ('admin'|'viewer')[]) {
    this.vcr.clear();
    const u = this.store.user();
    if (u && roles.includes(u.role)) this.vcr.createEmbeddedView(this.tpl);
  }
}
