import type { CustomField, ExternalData } from "./common";
export interface Job {
  id: number;
  jobNumber: string;
  projectId: number;
  customerId: number;
  locationId: number;
  jobStatus: string;
  completedOn: string;
  businessUnitId: number;
  jobTypeId: number;
  priority: string;
  campaignId: number;
  summary: string;
  customFields: CustomField[];
  appointmentCount: number;
  firstAppointmentId: number;
  lastAppointmentId: number;
  recallForId: number;
  warrantyId: number;
  jobGeneratedLeadSource: JobGeneratedLeadSource;
  noCharge: boolean;
  notificationsEnabled: boolean;
  createdOn: string;
  createdById: number;
  modifiedOn: string;
  tagTypeIds: number[];
  leadCallId: number;
  bookingId: number;
  soldById: number;
  externalData: ExternalData[];
  customerPo: string;
}
interface JobGeneratedLeadSource {
  jobId: number;
  employeeId: number;
}
export interface JobCancel {
  id: number;
  name: string;
  active: boolean;
  createdOn: string;
  modifiedOn: string;
}
