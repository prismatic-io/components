import { util } from "@prismatic-io/spectral";
export const booleanToString = (value: boolean): string =>
  value ? "true" : "false";
export const addToObjectIfContent = (
  object: Record<string, unknown>,
): Record<string, string> => {
  const newObject: Record<string, string> = {};
  for (const key of Object.keys(object)) {
    if (
      object[key] &&
      util.types.isString(object[key]) &&
      util.types.toString(object[key]).length
    ) {
      newObject[key] = util.types.toString(object[key]);
    }
  }
  return newObject;
};
