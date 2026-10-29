export interface PollingStateBase {
  errorCount: number;
  consecutiveErrors: number;
}

export interface IdocPollingState extends PollingStateBase {
  lastDocnum: string;
}

export interface IdocRecord {
  idocNumber: string;
  status: string;
  messageType: string;
  idocType: string;
  createdDate: string;
  createdTime: string;
  direction: string;
}

export interface IdocChangesObject {
  records: IdocRecord[];
  recordCount: number;
  lastDocnum: string;
}

export interface IdocRecordChange {
  changeType: "created";
  record: IdocRecord;
}
