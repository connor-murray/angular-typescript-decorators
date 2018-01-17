import {environment} from '../../environments/environment';

export function FunctionLogger(target: any, targetFunctionName: string, targetFunction: PropertyDescriptor): PropertyDescriptor {
  if (isNonProduction()) {
    targetFunction.value = appendFunctionLogging(target, targetFunctionName, targetFunction.value);
  }
  return targetFunction;
}

function appendFunctionLogging(target: any, targetFunctionName: any, originalFunction: any): Function {
  return function () {
    console.log(`%c ${getClassName(target)} ${targetFunctionName} called with:`, `color: #4CAF50; font-weight: bold`, arguments);
    const functionResult = originalFunction.apply(this, arguments);
    if (functionResult) {
      console.log(`%c ${getClassName(target)} ${targetFunctionName} returned:`, `${getLogStyle()}`, functionResult);
      return functionResult;
    }
  };
}

function getClassName(target: any): string {
  return target.constructor.name;
}

function isNonProduction(): boolean {
  return !environment.production;
}

function getLogStyle(): string {
  return 'color: #4CAF50; font-weight: bold';
}
