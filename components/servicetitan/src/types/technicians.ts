import type { Address, CustomField } from "./common";
export interface Technician {
  id: number;
  userId: number;
  name: string;
  roleIds: number[] | null;
  businessUnitId: number | null;
  mainZoneId: number | null;
  zoneIds: number[] | null;
  createdOn: string;
  modifiedOn: string;
  email: string | null;
  phoneNumber: string | null;
  loginName: string | null;
  home: Address | null;
  dailyGoal: number;
  isManagedTech: boolean;
  customFields: CustomField[] | null;
  active: boolean;
  aadUserId: string | null;
  burdenRate: number;
  team: string | null;
  jobFilter: string | null;
}
