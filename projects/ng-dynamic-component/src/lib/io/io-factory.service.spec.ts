import { ComponentRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MockedInjectedComponent } from '../../test';
import { DynamicComponentInjector } from '../component-injector/token';
import { IoFactoryService } from './io-factory.service';
import { IoService } from './io.service';

describe('Service: IoFactory', () => {
  let service: IoFactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IoFactoryService],
    });
    service = TestBed.inject(IoFactoryService);
  });

  describe('create() method', () => {
    it('should create new instance of `IoService` with `DynamicComponentInjector` and `IoServiceOptions`', () => {
      const ioService = service.create(
        'component-injector-mock' as any,
        'options-mock' as any,
      );

      const ioService2 = service.create(
        'component-injector-mock2' as any,
        'options-mock2' as any,
      );

      expect(ioService).toBeInstanceOf(IoService);
      expect(ioService2).toBeInstanceOf(IoService);
      expect(ioService).not.toBe(ioService2);
    });

    it('should create `IoService` with custom `Injector`', () => {
      const mockComponentInjector: DynamicComponentInjector = {
        componentRef: {
          instance: new MockedInjectedComponent(),
          componentType: MockedInjectedComponent,
        } as ComponentRef<MockedInjectedComponent>,
      };
    });
  });
});
