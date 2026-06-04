import type { AxiosResponse } from "axios";
import FormData from "form-data";

export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  if (Array.isArray(value) && value.length >= 1 && value[0] !== "000xxx") {
    return value as string[];
  }
  return undefined;
};

const validateDataType = (value: unknown) => {
  const type = typeof value;

  switch (type) {
    case "string":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "number":
      if (value === "" || Number.isNaN(value as number)) {
        return false;
      }
      return true;
    case "boolean":
      if (value === "" || value === null) {
        return false;
      }
      return true;
    case "object":
      if (Array.isArray(value)) {
        return true; 
      } else if (
        value !== null &&
        Object.keys(value as Record<string, unknown>).length > 0
      ) {
        return true; 
      }
      return false;
    default:
      return false;
  }
};

export const generateForm = (data: Record<string, unknown>) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value as string);
    }
  }

  return formData;
};

export const handleErrors = async (
  response: Promise<AxiosResponse>,
): Promise<AxiosResponse> => {
  try {
    return await response;
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Your action failed with ${e.name}: ${e.message}`);
    }
    throw new Error(`Your action failed with ${e}`);
  }
};
