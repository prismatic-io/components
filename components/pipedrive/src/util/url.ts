import { BASE_URL } from "../constants";
export const getBaseUrl = (version: string) => {
  const baseUrl =
    version === "v1" ? `${BASE_URL}/${version}` : `${BASE_URL}/api/${version}`;
  return baseUrl;
};
