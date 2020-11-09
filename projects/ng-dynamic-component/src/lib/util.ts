import { OnChanges, OnDestroy, SimpleChange, Type } from '@angular/core';

export function createNewChange(val: unknown): SimpleChange {
  return new SimpleChange(undefined, val, true);
}

export function createChange(val: unknown, prevVal: unknown): SimpleChange {
  return new SimpleChange(prevVal, val, false);
}

export function noop(): void {}

/**
 * Extract type arguments from Angular Directive/Component
 */
export function extractNgParamTypes(
  type: Type<unknown>,
): unknown[] | undefined {
  // NOTE: Accessing private APIs of Angular
  return (type as any)?.ctorParameters?.()?.map(param => param.type);
}

export function isOnDestroy(obj: unknown): obj is OnDestroy {
  return obj && typeof (obj as OnDestroy).ngOnDestroy === 'function';
}

export function isOnChanges(obj: unknown): obj is OnChanges {
  return obj && typeof (obj as OnChanges).ngOnChanges === 'function';
}
