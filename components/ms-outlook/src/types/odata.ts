export interface ODataAttrs {
  "@odata.id"?: string;
  "@odata.etag"?: string;
  "@odata.context"?: string;
  "@odata.type"?: string;
}

export interface ODataQueryParams {
  $top?: string | number;
  $skip?: string | number;
  $search?: string;
  $filter?: string;
}

export interface PaginatedResponse<T> {
  "@odata.context": string;
  value: T[];
  "@odata.nextLink"?: string;
}
