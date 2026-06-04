export const arrayObjectsStringMap = (array: unknown, key: string) => {
  if (array && Array.isArray(array)) {
    return array.map((val) => {
      return {
        [key]: val,
      };
    });
  }
  return undefined;
};
