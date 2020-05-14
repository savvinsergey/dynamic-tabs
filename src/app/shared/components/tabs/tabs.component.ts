import {
  AfterContentInit,
  AfterViewChecked, ChangeDetectorRef,
  Component,
  ContentChildren,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList, ViewChild,
  ViewChildren,
  ViewContainerRef
} from '@angular/core';
import {TabComponent} from './tab/tab.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements AfterContentInit, AfterViewChecked, OnDestroy {

  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  @ViewChildren('titleCmpContainer', {read: ViewContainerRef}) titleContainers: QueryList<ViewContainerRef>;
  @ViewChild('contentCmpContainer', {read: ViewContainerRef}) contentContainer: ViewContainerRef;

  @Output() activated = new EventEmitter<number>();

  private _needRenderTitles = true;
  private _needRenderContent = true;

  private _subscription: Subscription = null;

  constructor(private ref: ChangeDetectorRef){}

  ngAfterContentInit() {
    if (!this.tabs.length) {
      return;
    }

    this.onActivate(this.tabs.first, 0);

    this._subscription = this.tabs.changes
      .subscribe(() => {
        if (!this.tabs.length) {
          this.contentContainer.clear();
          return;
        }

        this._checkActiveTab();

        this._needRenderTitles = this.tabs.length > this.titleContainers.length;
      });
  }

  ngAfterViewChecked() {
    if (this._needRenderTitles) {
      this._renderTitlesToContainers();
    }

    if (this._needRenderContent) {
      this._renderContentToContainer();
    }
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  onActivate(tab: TabComponent, index: number): void {
    this._deactivateAllTabs();

    setTimeout(() => {
      this.activated.emit(index);
      tab.isActive = true;

      this._needRenderContent = true;
    });
  }

  private _deactivateAllTabs(): void {
    this.tabs.forEach(tab => tab.isActive = false);
  }

  private _checkActiveTab(): void {
    const noActiveTab = this.tabs
      .toArray()
      .every(tab => !tab.isActive);

    if (noActiveTab) {
      this.onActivate(this.tabs.first, 0);
    }
  }

  private _renderTitlesToContainers(): void {
    const titlesContainers = this.titleContainers.toArray();
    this.tabs.toArray()
      .forEach((tab, index) => {
        titlesContainers[index].clear();
        titlesContainers[index].createEmbeddedView(tab.titleTemplateRef);
      });

    this._needRenderTitles = false;
  }

  private _renderContentToContainer(): void {
    this.contentContainer.clear();
    this.tabs.toArray()
      .forEach(tab => {
        if (tab.isActive) {
          this.contentContainer.createEmbeddedView(tab.contentTemplateRef);
        }
      });

    this._needRenderContent = false;
  }
}
