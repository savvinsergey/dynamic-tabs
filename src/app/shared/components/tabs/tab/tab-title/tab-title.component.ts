import { Component, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'tab-title',
  template: '<ng-content></ng-content>',
})
export class TabTitleComponent {

  get innerContent() {
    return this._renderer.createText(
      this._elementRef.nativeElement.innerText
    );
  }

  constructor(private _elementRef: ElementRef,
              private _renderer: Renderer2) {}
}
