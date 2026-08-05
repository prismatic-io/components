import type { Address } from "./common";
export interface Booking {
  id: number;
  source: string;
  createdOn: string;
  name: string;
  address: Address;
  customerType: string;
  start: string;
  summary: string;
  campaignId: number;
  businessUnitId: number;
  isFirstTimeClient: boolean;
  uploadedImages: string[];
  isSendConfirmationEmail: boolean;
  status: string;
  dismissingReasonId: number;
  jobId: number;
  externalId: string;
  priority: string;
  jobTypeId: number;
  bookingProviderId: number;
  modifiedOn: string;
}
