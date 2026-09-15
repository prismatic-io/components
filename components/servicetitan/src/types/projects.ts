import type { CustomField, ExternalData } from "./common";
export interface Project {
  id: number;
  number: string;
  name: string | null;
  summary: string | null;
  status: string | null;
  statusId: number | null;
  subStatus: string | null;
  subStatusId: number | null;
  customerId: number;
  locationId: number;
  projectManagerIds: number[];
  businessUnitIds: number[];
  startDate: string | null;
  targetCompletionDate: string | null;
  actualCompletionDate: string | null;
  modifiedOn: string | null;
  createdOn: string;
  customFields: CustomField[];
  externalData: ExternalData[];
  jobIds: number[];
}
