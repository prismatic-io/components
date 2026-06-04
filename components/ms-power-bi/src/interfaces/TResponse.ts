export interface TResponse<T> {
  value: T[];
  "@odata.nextLink"?: string;
  "@odata.context": string;
}
