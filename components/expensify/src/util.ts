import FormData from "form-data";
import { type Connection, util } from "@prismatic-io/spectral";
import { URLSearchParams } from "url";

export const jsonInputClean = (value: unknown) => {
  if (typeof value === "string") {
    if (value !== null && value.trim() !== "") {
      return JSON.parse(value);
    }
  }
  return undefined;
};

export const valueListInputClean = (value: unknown) => {
  const IS_ARRAY_WITH_NO_DEFAULT_VALUE =
    Array.isArray(value) && value.length >= 1 && value[0].trim() !== "";
  if (IS_ARRAY_WITH_NO_DEFAULT_VALUE) {
    return value as string[];
  }
  return undefined;
};

export const valueListInputToStringClean = (value: unknown) => {
  const IS_ARRAY_WITH_NO_DEFAULT_VALUE =
    Array.isArray(value) && value.length >= 1 && value[0].trim() !== "";
  if (IS_ARRAY_WITH_NO_DEFAULT_VALUE) {
    return value.toString();
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
      if (value === "" || Number.isNaN(value)) {
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
      } else if (value !== null && Object.keys(value).length > 0) {
        return true; 
      }
      return false;
    default:
      return false;
  }
};

export const generateForm = (data: unknown) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      formData.append(key, value);
    }
  }

  return formData;
};

export const generatePayload = (
  data: Record<string, unknown>,
  connection: Connection,
): URLSearchParams => {
  const { partnerUserID, partnerUserSecret } = connection.fields;
  const json = {
    credentials: {
      partnerUserID: util.types.toString(partnerUserID),
      partnerUserSecret: util.types.toString(partnerUserSecret),
    },
    type: "get",
    ...data,
  };
  const params = new URLSearchParams();
  params.append("requestJobDescription", JSON.stringify(json));
  return params;
};
