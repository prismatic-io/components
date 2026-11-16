import { createConnection } from "@prismatic-io/spectral/testing";
import { apiKey } from "./connections";

export const BAMBOO_HOST = "https://api.bamboohr.com";
export const COMPANY_DOMAIN = "exampleco";
export const GATEWAY = `/api/gateway.php/${COMPANY_DOMAIN}`;

export const testConnection = createConnection(apiKey, {
  apiKey: "test-api-key",
  companyDomain: COMPANY_DOMAIN,
});
