// tslint:disable: component-selector no-input-rename no-output-rename
import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  NgModule,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'test',
  template: '',
})
export class TestComponent {}

@Component({
  selector: 'injected',
  template: 'foo',
})
export class InjectedComponent {}

@Component({
  selector: 'another-injected',
  template: 'bar',
})
export class AnotherInjectedComponent {}

@Component({
  selector: 'test-bindings',
  template: 'baz',
})
export class InjectedBoundComponent implements OnChanges {
  @Input('outerProp')
  innerProp: any;
  @Output('outerEvt')
  innerEvt = new EventEmitter<any>();

  ngOnChanges(): void {}
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    InjectedComponent,
    AnotherInjectedComponent,
    InjectedBoundComponent,
  ],
  exports: [
    InjectedComponent,
    AnotherInjectedComponent,
    InjectedBoundComponent,
  ],
  entryComponents: [
    InjectedComponent,
    AnotherInjectedComponent,
    InjectedBoundComponent,
  ],
})
export class TestModule {}
