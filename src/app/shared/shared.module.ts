import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabComponent } from './components/tabs/tab/tab.component';
import { TabTitleComponent } from './components/tabs/tab/tab-title/tab-title.component';
import { TabContentComponent } from './components/tabs/tab/tab-content/tab-content.component';

@NgModule({
  declarations: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent
  ],
  exports: [
    TabsComponent,
    TabComponent,
    TabTitleComponent,
    TabContentComponent
  ],
  imports: [
    CommonModule
  ],
  entryComponents: [
    TabTitleComponent,
    TabContentComponent
  ]
})
export class SharedModule { }
