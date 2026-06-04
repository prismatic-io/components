import { util } from "@prismatic-io/spectral";

export const hasProperty = (
  object: Record<string, unknown>,
  prop: string,
): unknown => {
  for (const name of Object.keys(object)) {
    if (name === prop) {
      return object[name];
    }
    if (typeof object[name] === "object" && object[name] !== null) {
      const found = hasProperty(object[name] as Record<string, unknown>, prop);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
};

export const getPayload = (invokeArgs: unknown) => {
  if (util.types.isJSON(util.types.toString(invokeArgs))) {
    return invokeArgs;
  }
  try {
    return JSON.stringify(invokeArgs);
  } catch (err) {
    throw new Error(
      `Unable to serialize payload to JSON. Payloads must be JSON, or a JSON-serializable object. Error: ${err}`,
    );
  }
};
