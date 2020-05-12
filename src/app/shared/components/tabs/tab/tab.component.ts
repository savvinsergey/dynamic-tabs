import {Component, ContentChild, EventEmitter, Output} from '@angular/core';

import {TabTitleComponent} from './tab-title/tab-title.component';
import {TabContentComponent} from './tab-content/tab-content.component';

@Component({
  selector: 'tab',
  template: ''
})
export class TabComponent {

  @ContentChild(TabTitleComponent, {read: TabTitleComponent}) title: TabTitleComponent;
  @ContentChild(TabContentComponent, {read: TabContentComponent}) content: TabContentComponent;

  isActive = false;
}
