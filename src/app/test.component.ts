import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'test',
  template:  `
    <div>
      TestComponent '{{ this.tab.title }}' content <br/>
      <button (click)="onClick()">Check event for tab => {{this.tab.title}}</button>
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
