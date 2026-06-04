const productionUrl = "https://api.servicetitan.io";
const integrationUrl = "https://api-integration.servicetitan.io";

export const URLS: Record<string, string> = {
  production: productionUrl,
  integration: integrationUrl,
};

import type { PollResourceConfig } from "./types";

export const POLL_RESOURCE_CONFIG: Record<string, PollResourceConfig> = {
  jobs: {
    label: "Jobs",
    endpoint: "/jobs",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  appointments: {
    label: "Appointments",
    endpoint: "/appointments",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  projects: {
    label: "Projects",
    endpoint: "/projects",
    urlType: "jpm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  invoices: {
    label: "Invoices",
    endpoint: "/invoices",
    urlType: "accounting",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  payments: {
    label: "Payments",
    endpoint: "/payments",
    urlType: "accounting",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  customers: {
    label: "Customers",
    endpoint: "/customers",
    urlType: "crm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  locations: {
    label: "Locations",
    endpoint: "/locations",
    urlType: "crm",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  installedEquipment: {
    label: "Installed Equipment",
    endpoint: "/installed-equipment",
    urlType: "equipmentsystems",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
  technicians: {
    label: "Technicians",
    endpoint: "/technicians",
    urlType: "settings",
    createdAtField: "createdOn",
    updatedAtField: "modifiedOn",
  },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);
