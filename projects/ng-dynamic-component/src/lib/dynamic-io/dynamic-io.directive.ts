import { Directive, DoCheck, Input } from '@angular/core';

import { InputsType, IoService, IoServiceProvider, OutputsType } from '../io';

@Directive({
  selector: '[ndcDynamicInputs],[ndcDynamicOutputs]',
  exportAs: 'ndcDynamicIo',
  providers: [IoServiceProvider],
})
export class DynamicIoDirective implements DoCheck {
  @Input()
  ndcDynamicInputs: InputsType;
  @Input()
  ndcDynamicOutputs: OutputsType;

  constructor(private ioService: IoService) {}

  ngDoCheck() {
    this.ioService.update(this.ndcDynamicInputs, this.ndcDynamicOutputs);
  }
}
