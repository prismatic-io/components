export interface SageOperationResult {
  errormessage?: string;
}
export interface SageOperation {
  result?: SageOperationResult;
}
export interface SageResponse {
  errormessage?: string;
  operation?: SageOperation;
}
export interface SageApiResponse {
  response?: SageResponse;
}
