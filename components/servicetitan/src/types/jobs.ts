import type { CustomField, ExternalData } from "./common";
interface JobGeneratedLeadSource {
  jobId: number | null;
  employeeId: number | null;
}
export interface Job {
  id: number;
  jobNumber: string;
  projectId: number | null;
  customerId: number;
  locationId: number;
  jobStatus: string;
  completedOn: string | null;
  businessUnitId: number;
  jobTypeId: number;
  priority: string;
  campaignId: number;
  summary: string | null;
  customFields: CustomField[];
  appointmentCount: number;
  firstAppointmentId: number;
  lastAppointmentId: number;
  recallForId: number | null;
  warrantyId: number | null;
  jobGeneratedLeadSource: JobGeneratedLeadSource | null;
  noCharge: boolean;
  notificationsEnabled: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  tagTypeIds: number[];
  leadCallId: number | null;
  bookingId: number | null;
  soldById: number | null;
  externalData: ExternalData[];
  customerPo: string;
}
export interface JobCancel {
  id: number;
  name: string;
  active: boolean;
  createdOn: string;
  modifiedOn: string;
}
