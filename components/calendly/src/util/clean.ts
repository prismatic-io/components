import { util } from "@prismatic-io/spectral";
import { LIVE_API_URL } from "../constants";
export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};
export const cleanOrganizationInput = (value: unknown) => {
  const organizationsBasePath = `${LIVE_API_URL}/organizations/`;
  if (typeof value === "string") {
    if (!value.includes(organizationsBasePath)) {
      return `${organizationsBasePath}${value}`;
    }
  }
  return util.types.toString(value);
};
