import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'test',
  template:  `
    <div>
      <button (click)="onClick()">TestComponent {{ this.tab.title }} content</button>
    </div>
  `,
})
export class TestComponent implements OnInit {

  @Input() tab: any;

  public ngOnInit() {
    console.log(`>>> TestComponent '${this.tab.title}' initialized`);
  }

  onClick() {
    console.log(`>>> Click to tab '${this.tab.title}'`);
  }
}
