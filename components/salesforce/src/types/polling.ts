export interface PollingTriggerObject {
  CreatedDate: string;
  LastModifiedDate: string;
  [key: string]: unknown;
}

export interface DeletedRecord {
  id: string;
  deletedDate: string;
  IsDeleted: true;
}

export interface SearchRecordsPollingState {
  lastPolledAt?: string;
}
