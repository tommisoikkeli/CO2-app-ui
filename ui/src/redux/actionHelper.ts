export function createAction(type: string, payload?: any) {
  return payload ? {type, payload} : {type};
}
