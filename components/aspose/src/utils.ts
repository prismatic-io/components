import { util } from "@prismatic-io/spectral";

export const convertToBase64 = (content: string) => {
  return Buffer.from(content).toString("base64");
};





export const cleanString = (value: unknown): string | undefined =>
  value ? util.types.toString(value) : undefined;

export const createModelWithAReadableInput = (value: string) => {
  return {
    label: value.replace(/([A-Z])/g, " $1").trim(),
    value,
  };
};
