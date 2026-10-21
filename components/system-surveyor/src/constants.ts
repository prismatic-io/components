export const DEFAULT_PAGE_SIZE = "100";
export const BASE_PRODUCTION_URL = "https://openapi.systemsurveyor.com";
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const BASE_URL = [
  { label: "Production", value: BASE_PRODUCTION_URL },
  { label: "Staging", value: "https://openapi.staging.ssvxp.com" },
  { label: "Dev", value: "https://openapi.dev.ssvxp.com" },
];
