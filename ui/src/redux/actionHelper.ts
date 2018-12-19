export function createAction<T, P>(type: T, payload?: P) {
  return payload ? {type, payload} : {type};
}
