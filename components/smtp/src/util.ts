import { KeyValuePair, util } from "@prismatic-io/spectral";

export const cleanString = (value: unknown) =>
  value ? util.types.toString(value).trim() : undefined;

const cleanEmailArray = (value: string[]) => {
  return value.map(cleanString).filter(Boolean);
};

export const cleanEmailInput = (value: unknown, required = false) => {
  if (value) {
    const email = util.types.toObject(value);
    if (Array.isArray(email)) {
      return cleanEmailArray(email);
    }
  }
  if (required) {
    throw new Error("Invalid email input.");
  }
  return [];
};

const throwCodeInputError = (inputLabel: string): void => {
  throw new Error(`Invalid code for ${inputLabel} input.`);
};

export const cleanArrayCodeInput = (
  value: unknown,
  inputLabel: string,
): Record<string, unknown>[] => {
  if (value) {
    let object;
    try {
      object = util.types.toObject(value);
    } catch (error) {
      throwCodeInputError(inputLabel);
    }
    if (Array.isArray(object)) {
      return cleanAttachments(object);
    }
    throw new Error(`Invalid array for ${inputLabel} input.`);
  }
  return [];
};

export const cleanAttachments = (attachments: unknown) =>
  ((attachments as KeyValuePair[]) || []).map((attachment) => ({
    filename: attachment.key,
    content: util.types.toBufferDataPayload(attachment.value).data,
  }));
