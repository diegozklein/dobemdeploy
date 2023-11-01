export function exclude(entity: any, ...keys: string[]) {
  for (let key of keys) {
    delete entity[key];
  }
  return entity;
}
