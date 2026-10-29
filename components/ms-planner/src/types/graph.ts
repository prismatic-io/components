export interface GraphCollectionResponse<T> {
  value: T[];
  "@odata.context"?: string;
  "@odata.nextLink"?: string;
}
export interface Etagged {
  "@odata.etag"?: string;
}
