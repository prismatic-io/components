export const SERVICES = {
  timeTracking: "/timeTracking/v5",
  absenceManagement: "/absenceManagement/v5",
  person: "/person/v4",
  accountsPayable: "/accountsPayable/v1",
  businessProcess: "/businessProcess/v1",
  connect: "/connect/v2",
  customerAccounts: "/customerAccounts/v1",
  common: "/api/common/v1",
  prismAnalytics: "/api/prismAnalytics/v3",
  staffing: "/staffing/v7",
} as const;

export type ServiceKey = keyof typeof SERVICES;
