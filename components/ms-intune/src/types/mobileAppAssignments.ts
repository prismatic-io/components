export interface MobileAppAssignmentBody {
  intent: string;
  target: { "@odata.type": string; groupId?: string };
  settings: { "@odata.type": string; useDeviceContext: boolean };
}
