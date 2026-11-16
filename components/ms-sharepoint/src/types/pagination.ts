export interface PaginateOptions {
  returnFullData?: boolean;
  useTop?: boolean;
  excludeParents?: boolean;
}

export interface GraphCollectionResponse<T> {
  value: T[];
  "@odata.context"?: string;
  "@odata.nextLink"?: string;
}
