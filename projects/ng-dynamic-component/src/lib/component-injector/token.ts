import { ComponentRef, InjectionToken } from '@angular/core';

export interface DynamicComponentInjector {
  componentRef: ComponentRef<unknown> | null;
}

/**
 * @deprecated Since v6.0.0 - Use {@link DynamicComponentInjector} instead
 */
export type ComponentInjector = DynamicComponentInjector;

export const DynamicComponentInjectorToken = new InjectionToken<
  DynamicComponentInjector
>('DynamicComponentInjector');

/**
 * @deprecated Since v6.0.0 - Use {@link DynamicComponentInjectorToken} instead
 * and provide component class via `useExisting` instead of `useValue`
 */
export const COMPONENT_INJECTOR = DynamicComponentInjectorToken;
