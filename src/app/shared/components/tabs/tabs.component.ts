import {
  AfterContentChecked, AfterContentInit, Component, ContentChildren, EventEmitter, OnInit, Output, QueryList
} from '@angular/core';
import {TabComponent} from './tab/tab.component';
import {TabTitleComponent} from './tab/tab-title/tab-title.component';
import {TabContentComponent} from './tab/tab-content/tab-content.component';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, AfterContentInit, AfterContentChecked {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @Output() activated = new EventEmitter<number>();

  tabTitleComponent = TabTitleComponent;
  tabContentComponent = TabContentComponent;

  ngOnInit() {
    this.activated.emit(0);
  }

  ngAfterContentInit() {
    if (!this.tabs.length) {
      return;
    }

    this.tabs.first.isActive = true;
  }

  ngAfterContentChecked() {
    if (!this.tabs.length) {
      return;
    }

    const noActiveTab = this.tabs
      .toArray()
      .every(tab => !tab.isActive);

    if (noActiveTab) {
      this.tabs.first.isActive = true;
      setTimeout(() => this.activated.emit(0));
    }
  }

  onActivate(tab: TabComponent, index: number) {
    this._deactivateAllTabs();

    tab.isActive = true;
    this.activated.emit(index);
  }

  private _deactivateAllTabs() {
    this.tabs.forEach(tab => tab.isActive = false);
  }
}
