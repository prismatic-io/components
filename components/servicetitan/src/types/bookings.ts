import type { Address } from "./common";
export interface Booking {
  id: number;
  source: string;
  createdOn: string;
  name: string;
  address: Address | null;
  customerType: "Residential" | "Commercial" | null;
  start: string;
  summary: string | null;
  campaignId: number | null;
  businessUnitId: number | null;
  isFirstTimeClient: boolean | null;
  uploadedImages: string[] | null;
  isSendConfirmationEmail: boolean | null;
  status: "New" | "Converted" | "Dismissed" | "Accepted";
  dismissingReasonId: number | null;
  jobId: number | null;
  externalId: string;
  priority: "Low" | "Normal" | "High" | "Urgent" | null;
  jobTypeId: number | null;
  bookingProviderId: number;
  modifiedOn: string;
}
