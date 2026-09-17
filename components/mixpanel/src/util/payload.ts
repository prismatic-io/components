const validateDataType = (value) => {
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
      }
      if (value !== null && Object.keys(value).length > 0) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
export const generatePayload = (data) => {
  const params = {};
  for (const [key, value] of Object.entries(data)) {
    if (validateDataType(value)) {
      params[key] = value;
    }
  }
  return params;
};
