import {environment} from '../../environments/environment';

export function Environment(environmentPropertyName: string): PropertyDecorator {
  return (targetClass: any, targetProperty: string) => {
    const environmentProperty: any = environment[environmentPropertyName];
    const propertyDescriptor: any = Object.getOwnPropertyDescriptor(targetClass, targetProperty) || {};
    propertyDescriptor.value = environmentProperty ? environmentProperty : 'Property Not Found!';
    Object.defineProperty(targetClass, targetProperty, propertyDescriptor);
  };
}
