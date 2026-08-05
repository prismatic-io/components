import type { CustomField, ExternalData } from "./common";
export interface Project {
  id: number;
  number: string;
  name: string;
  summary: string;
  status: string;
  statusId: number;
  subStatus: string;
  subStatusId: number;
  customerId: number;
  locationId: number;
  projectManagerIds: number[];
  businessUnitIds: number[];
  startDate: string;
  targetCompletionDate: string;
  actualCompletionDate: string;
  modifiedOn: string;
  createdOn: string;
  customFields: CustomField[];
  externalData: ExternalData[];
  jobIds: number[];
}
