export interface DriveItem {
  id: string;
  name: string;
  folder?: {
    childCount: number;
  };
  file?: {
    mimeType: string;
  };
  size?: number;
  webUrl?: string;
  lastModifiedDateTime?: string;
  createdDateTime?: string;
  deleted?: { state: string };
  parentReference: {
    driveId: string;
    id: string;
    path: string;
  };
}

export interface DriveResponse {
  value: DriveItem[];
  "@odata.nextLink"?: string;
  "@odata.context": string;
}

export interface DriveDeltaResponse extends DriveResponse {
  "@odata.deltaLink": string;
}

export interface ListItem {
  id: string;
  fields: { Title: string };
}

export interface Subscription {
  id: string;
  resource: string;
  changeType: string;
  notificationUrl: string;
}

export interface PollSiteChangesSeparatedChanges {
  deleted?: DriveItem[];
  added?: DriveItem[];
  updated?: DriveItem[];
  moved?: DriveItem[];
}

export interface PollSiteChangesResult {
  [key: string]: PollSiteChangesSeparatedChanges;
}

export interface PollingState {
  [key: string]: string;
}

export interface DriveTriggerItem {
  isDeleted: boolean;
  separatedChanges: PollSiteChangesSeparatedChanges;
  change: DriveItem;
}

export interface WebhookNotification {
  subscriptionId: string;
  clientState?: string;
  changeType: string;
  resource: string;
  resourceData?: {
    "@odata.type": string;
    "@odata.id": string;
    id: string;
  };
  subscriptionExpirationDateTime?: string;
  tenantId?: string;
}

export interface WebhookNotificationPayload {
  value: WebhookNotification[];
}
