import {environment} from '../../environments/environment';

const LIFECYCLE_HOOKS: string[] = [
  'ngOnInit',
  'ngOnChanges',
  'ngOnDestroy'
];

export function LifecycleLogger(): ClassDecorator {
  return function (constructor: any) {
    if (isNonProduction()) {
      logLifeCycleHook(constructor);
    }
  };
}

function logLifeCycleHook(constructor: any): void {
  const className = constructor.name;
  LIFECYCLE_HOOKS.forEach(lifeCycleHook => {
    const originalLifeCycleHook = constructor.prototype[lifeCycleHook];
    constructor.prototype[lifeCycleHook] = function (...args) {
      console.log(`%c ${className} - ${lifeCycleHook}`, `${getLogStyle()}`, ...args);
      originalLifeCycleHook.apply(this, args);
    };
  });
}

function isNonProduction(): boolean {
  return !environment.production;
}

function getLogStyle(): string {
  return 'color: #4CAF50; font-weight: bold';
}
