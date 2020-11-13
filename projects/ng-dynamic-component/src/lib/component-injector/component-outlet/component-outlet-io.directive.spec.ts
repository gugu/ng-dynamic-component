// tslint:disable: no-string-literal
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Subject } from 'rxjs';

import {
  getByPredicate,
  InjectedComponent,
  TestComponent,
  TestModule,
} from '../../../test';
import { ComponentOutletInjectorDirective } from './component-outlet-injector.directive';
import { ComponentOutletIoDirective } from './component-outlet-io.directive';

const getInjectedComponentFrom = getByPredicate<InjectedComponent>(
  By.directive(InjectedComponent),
);

describe('Directive: ComponentOutletIo', () => {
  describe('inputs with `NgComponentOutlet` * syntax', () => {
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [TestModule],
        declarations: [
          ComponentOutletIoDirective,
          ComponentOutletInjectorDirective,
          TestComponent,
        ],
      });

      const template = `<ng-container *ngComponentOutlet="comp; ndcDynamicInputs: inputs"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);

      fixture.componentInstance['inputs'] = { prop1: '123', prop2: 1 };
      fixture.componentInstance['comp'] = InjectedComponent;
    }));

    it('should be passed to dynamic component instance', () => {
      fixture.detectChanges();

      const injectedComp = getInjectedComponentFrom(fixture).component;

      expect(injectedComp['prop1']).toBe('123');
      expect(injectedComp['prop2']).toBe(1);
    });
  });

  describe('outputs with `NgComponentOutlet` * syntax', () => {
    let fixture: ComponentFixture<TestComponent>;
    let outputSpy: jasmine.Spy;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [TestModule],
        declarations: [
          ComponentOutletIoDirective,
          ComponentOutletInjectorDirective,
          TestComponent,
        ],
      });

      const template = `<ng-container *ngComponentOutlet="comp; ndcDynamicOutputs: outputs"></ng-container>`;
      TestBed.overrideComponent(TestComponent, { set: { template } });
      fixture = TestBed.createComponent(TestComponent);

      outputSpy = jasmine.createSpy('outputSpy');

      InjectedComponent.prototype['onEvent'] = new Subject<any>();

      fixture.componentInstance['outputs'] = { onEvent: outputSpy };
      fixture.componentInstance['comp'] = InjectedComponent;
    }));

    afterEach(() => delete InjectedComponent.prototype['onEvent']);

    it('should be passed to dynamic component instance', () => {
      fixture.detectChanges();

      const injectedComp = getInjectedComponentFrom(fixture).component;

      injectedComp['onEvent'].next('data');

      expect(outputSpy).toHaveBeenCalledTimes(1);
      expect(outputSpy).toHaveBeenCalledWith('data');
    });
  });
});
