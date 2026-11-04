import { util } from "@prismatic-io/spectral";
import { SHOPIFY_GID_PREFIX } from "../constants";

export const cleanStringInput = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const toArray = (value: unknown): unknown[] =>
  Array.isArray(value) ? value : [value];

export const cleanCodeInput = (value: unknown): object =>
  value ? util.types.toObject(value) : {};

export const cleanKeyValueListInput = (
  value: unknown,
): Record<string, unknown> => {
  if (Array.isArray(value)) return util.types.keyValPairListToObject(value);
  return {};
};

const throwCodeInputError = (inputLabel: string): never => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
): unknown[] | undefined => {
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
): string[] | undefined => {
  if (Array.isArray(value)) return value.map((el) => util.types.toString(el));
  return returnUndefinedOnNoValue ? undefined : [];
};

export const cleanCodeInputEmptyObject = (
  value: unknown,
  inputLabel: string,
): object => {
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
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Product/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}Product/${input}`;
};

export const cleanCustomerId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Customer/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}Customer/${input}`;
};

export const cleanFulfillmentOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}FulfillmentOrder/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}FulfillmentOrder/${input}`;
};

export const cleanOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Order/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}Order/${input}`;
};

export const cleanFulfillmentId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Fulfillment/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}Fulfillment/${input}`;
};

export const cleanLocationId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Location/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}Location/${input}`;
};

export const cleanDraftOrderId = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}DraftOrder/`)) {
    return input;
  }
  return `${SHOPIFY_GID_PREFIX}DraftOrder/${input}`;
};

export const cleanProductIdForVariant = (value: unknown): string => {
  const input = util.types.toString(value);
  if (input.startsWith(`${SHOPIFY_GID_PREFIX}Product/`)) {
    return util.types.toString(getNumericId(input));
  }
  return input;
};

export const cleanNumberInput = (value: unknown): number | undefined =>
  value ? util.types.toNumber(value) : undefined;
