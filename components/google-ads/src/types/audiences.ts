export interface DataManagerUserList {
  id: string;
  displayName?: string;
  readOnly?: boolean;
  ingestedUserListInfo?: Record<string, unknown>;
}

export interface ListUserListsResponse {
  userLists?: DataManagerUserList[];
  nextPageToken?: string;
}
