import type { PollResourceConfig } from "./types";
export const PRODUCTION_URL = "https://api.servicetitan.io";
export const INTEGRATION_URL = "https://api-integration.servicetitan.io";
export const URLS: Record<string, string> = {
  production: PRODUCTION_URL,
  integration: INTEGRATION_URL,
};
export const MAX_BATCHED_RECORDS = 1000;
export const LOOK_BACK_DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  jobs: {
    label: "Jobs",
    endpoint: "/jobs",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  appointments: {
    label: "Appointments",
    endpoint: "/appointments",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  projects: {
    label: "Projects",
    endpoint: "/projects",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  invoices: {
    label: "Invoices",
    endpoint: "/invoices",
    urlType: "accounting",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  payments: {
    label: "Payments",
    endpoint: "/payments",
    urlType: "accounting",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  customers: {
    label: "Customers",
    endpoint: "/customers",
    urlType: "crm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  locations: {
    label: "Locations",
    endpoint: "/locations",
    urlType: "crm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  installedEquipment: {
    label: "Installed Equipment",
    endpoint: "/installed-equipment",
    urlType: "equipmentsystems",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
    sortField: "ModifiedOn",
  },
  technicians: {
    label: "Technicians",
    endpoint: "/technicians",
    urlType: "settings",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
};
