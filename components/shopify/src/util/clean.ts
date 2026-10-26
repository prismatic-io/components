import { util } from "@prismatic-io/spectral";
export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;
export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
export const cleanCodeInput = (value: unknown): object =>
  value ? util.types.toObject(value) : {};
export const cleanKeyValueListInput = (
  value: unknown,
): Record<string, unknown> => {
  if (Array.isArray(value)) return util.types.keyValPairListToObject(value);
  return {};
};
const throwCodeInputError = (inputLabel: string) => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};
export const cleanArrayCodeInput = (value: unknown, inputLabel: string) => {
  if (value) {
    let object: unknown;
    try {
      object = util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return object;
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return undefined;
};
export const cleanValueListInput = (
  value: unknown,
  returnUndefinedOnNoValue = false,
): string[] => {
  if (Array.isArray(value)) return value.map((el) => util.types.toString(el));
  return returnUndefinedOnNoValue ? undefined : [];
};
export const cleanCodeInputEmptyObject = (
  value: unknown,
  inputLabel: string,
) => {
  if (value) {
    try {
      return util.types.toObject(value);
    } catch (_error) {
      throwCodeInputError(inputLabel);
    }
  }
  return {};
};
export const cleanOptionalBooleanInput = (
  value: unknown,
): boolean | undefined => (value ? util.types.toBool(value) : undefined);
export const getNumericId = (gid: string): number | null => {
  const match = gid.match(/\/(\d+)(?:\?|$)/);
  return match ? Number.parseInt(match[1], 10) : null;
};
export const cleanProductId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Product/")) {
    return input;
  }
  return `gid://shopify/Product/${input}`;
};
export const cleanCustomerId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Customer/")) {
    return input;
  }
  return `gid://shopify/Customer/${input}`;
};
export const cleanFulfillmentOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/FulfillmentOrder/")) {
    return input;
  }
  return `gid://shopify/FulfillmentOrder/${input}`;
};
export const cleanOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Order/")) {
    return input;
  }
  return `gid://shopify/Order/${input}`;
};
export const cleanFulfillmentId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Fulfillment/")) {
    return input;
  }
  return `gid://shopify/Fulfillment/${input}`;
};
export const cleanLocationId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Location/")) {
    return input;
  }
  return `gid://shopify/Location/${input}`;
};
export const cleanDraftOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/DraftOrder/")) {
    return input;
  }
  return `gid://shopify/DraftOrder/${input}`;
};
export const cleanProductIdForVariant = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith("gid://shopify/Product/")) {
    return util.types.toString(getNumericId(input));
  }
  return input;
};
