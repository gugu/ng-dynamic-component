import { Directive, DoCheck, Input } from '@angular/core';

import {
  InputsType,
  IoService,
  IoServiceProvider,
  OutputsType,
} from '../../io';

@Directive({
  selector:
    // tslint:disable-next-line: directive-selector
    '[ngComponentOutletNdcDynamicInputs],[ngComponentOutletNdcDynamicOutputs]',
  exportAs: 'ndcDynamicIo',
  providers: [IoServiceProvider],
})
export class ComponentOutletIoDirective implements DoCheck {
  @Input()
  ngComponentOutletNdcDynamicInputs: InputsType;
  @Input()
  ngComponentOutletNdcDynamicOutputs: OutputsType;

  constructor(private ioService: IoService) {}

  ngDoCheck() {
    this.ioService.update(
      this.ngComponentOutletNdcDynamicInputs,
      this.ngComponentOutletNdcDynamicOutputs,
    );
  }
}
