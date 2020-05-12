import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChildren,
  EventEmitter, OnDestroy,
  OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {TabComponent} from './tab/tab.component';
import {TabTitleComponent} from './tab/tab-title/tab-title.component';
import {TabContentComponent} from './tab/tab-content/tab-content.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, AfterContentInit, AfterViewInit, OnDestroy {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChildren('titleCmpContainer', {read: ViewContainerRef}) titleContainers: QueryList<ViewContainerRef>;
  @ViewChild('contentCmpContainer', {read: ViewContainerRef}) contentContainer: ViewContainerRef;

  @Output() activated = new EventEmitter<number>();

  private _subscription: Subscription = null;

  ngOnInit() {
    this.activated.emit(0);
  }

  ngAfterContentInit() {
    if (!this.tabs.length) {
      return;
    }

    this.tabs.first.isActive = true;

    this._subscription = this.tabs.changes
      .subscribe(() => {
        this._checkActiveTab();
        setTimeout(() => {
          this._renderTitlesToContainers();
        });
      });
  }

  ngAfterViewInit() {
    this._renderTitlesToContainers();
    this._renderContentToContainer();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onActivate(tab: TabComponent, index: number): void {
    this._deactivateAllTabs();

    tab.isActive = true;
    this.activated.emit(index);

    this._renderContentToContainer();
  }

  private _deactivateAllTabs(): void {
    this.tabs.forEach(tab => tab.isActive = false);
  }

  private _checkActiveTab(): void {
    if (!this.tabs.length) {
      this._renderContentToContainer();
      return;
    }

    const noActiveTab = this.tabs
      .toArray()
      .every(tab => !tab.isActive);

    if (noActiveTab) {
      this.tabs.first.isActive = true;
      setTimeout(() => {
        this.activated.emit(0);
        this._renderContentToContainer();
      });
    }
  }

  private _renderTitlesToContainers(): void {
    const titlesContainers = this.titleContainers.toArray();
    this.tabs.toArray()
      .forEach((tab, index) => {
        titlesContainers[index].clear();
        titlesContainers[index].createEmbeddedView(tab.titleTemplateRef);
      });
  }

  private _renderContentToContainer(): void {
    this.contentContainer.clear();
    this.tabs.toArray()
      .forEach(tab => {
        if (tab.isActive) {
          this.contentContainer.createEmbeddedView(tab.contentTemplateRef);
        }
      });
  }
}
