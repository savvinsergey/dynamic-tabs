import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tabs = [
    {
      title: '1 TAB',
      content: '1 Tab content'
    },
    {
      title: '2 TAB',
      content: '2 Tab content'
    },
    {
      title: '3 TAB',
      content: '3 Tab content'
    }
  ];

  activatedTabIndex;

  onAddTab() {
    this.tabs = [ ...this.tabs, {
      title: `${this.tabs.length + 1} TAB`,
      content: `${this.tabs.length + 1} TAB content`
    }];
  }

  onRemoveTab() {
    this.tabs = this.tabs.slice(0, -1);
  }
}
