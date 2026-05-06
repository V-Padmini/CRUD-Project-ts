export function get(path: string) {
  return function (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log(`@get("${path}") applied to ${propertyKey}`);
  };
}

export function post(path: string) {
  return function (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log(`@post("${path}") applied to ${propertyKey}`);
  };
}

export function put(path: string) {
  return function (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log(`@put("${path}") applied to ${propertyKey}`);
  };
}

export function del(path: string) {
  return function (_target: any, propertyKey: string, _descriptor: PropertyDescriptor) {
    console.log(`@delete("${path}") applied to ${propertyKey}`);
  };
}

// Parameter decorator for request body
export function requestBody(_target: Object, propertyKey: string | symbol, parameterIndex: number) {
  console.log(`@requestBody applied to ${String(propertyKey)} parameter #${parameterIndex}`);
}

// Parameter decorator for URL/path parameters
export function param(paramType: string, name: string) {
  return function (_target: Object, propertyKey: string | symbol, parameterIndex: number) {
    console.log(`@param("${paramType}", "${name}") applied to ${String(propertyKey)} parameter #${parameterIndex}`);
  };
}