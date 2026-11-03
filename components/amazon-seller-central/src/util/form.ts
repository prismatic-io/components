import FormData from "form-data";

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
      }
      if (value !== null && Object.keys(value).length > 0) {
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

export const sortedArray = (
  first: { countryName: string },
  second: { countryName: string },
) => {
  if (first.countryName > second.countryName) {
    return 1;
  }
  if (first.countryName < second.countryName) {
    return -1;
  }
  return 0;
};
