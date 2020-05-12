import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'test',
  template:  `
    <div>
      TestComponent {{ this.tab.title }} content
    </div>
  `,
})
export class TestComponent implements OnInit {

  @Input() tab: any;

  public ngOnInit() {
    console.log(`>>> TestComponent '${this.tab.title}' initialized`);
  }
}
