import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Output,
  TemplateRef, ViewChild,
  ViewContainerRef
} from '@angular/core';

import {TabTitleComponent} from './tab-title/tab-title.component';
import {TabContentComponent} from './tab-content/tab-content.component';

@Component({
  selector: 'tab',
  template: `
    <ng-template #title>
      <ng-content select="tab-title"></ng-content>
    </ng-template>

    <ng-template #content>
      <ng-content select="tab-content"></ng-content>
    </ng-template>
  `
})
export class TabComponent {

  isActive = false;

  @ViewChild('title', {read: TemplateRef}) titleTemplateRef: TemplateRef<any>;
  @ViewChild('content', {read: TemplateRef}) contentTemplateRef: TemplateRef<any>;
}
