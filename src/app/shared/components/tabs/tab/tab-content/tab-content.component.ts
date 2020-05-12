import {Component, ElementRef, Renderer2} from '@angular/core';

@Component({
  selector: 'tab-content',
  template: '<ng-content></ng-content>',
})
export class TabContentComponent {

  get innerContent() {
    const div = this._renderer.createElement('div');
    div.innerHTML = this._elementRef.nativeElement.innerHTML;

    return div;
  }

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {}
}
