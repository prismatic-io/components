import type { Address, CustomField } from "./common";
export interface Technician {
  id: number;
  userId: number;
  name: string;
  roleIds: number[];
  businessUnitId: number;
  mainZoneId: number;
  zoneIds: number[];
  createdOn: string;
  modifiedOn: string;
  email: string;
  phoneNumber: string;
  loginName: string;
  home: Address;
  dailyGoal: number;
  isManagedTech: boolean;
  customFields: CustomField[];
  active: boolean;
  aadUserId: string;
  burdenRate: number;
  team: string;
  jobFilter: string;
}
