import { toStr } from "./toStr";

export const getBaseUrl = (domain: unknown) => {
  if (!domain) {
    throw new Error("Domain is required for this connection.");
  }

  return `https://${toStr(domain)}.gorgias.com/api`;
};
