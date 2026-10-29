export interface GoogleAdsSearchResponse<T> {
  results?: T[];
  nextPageToken?: string;
  fieldMask?: string;
  queryResourceConsumption?: string;
}

export interface SearchGoogleAdsOptions {
  customerId: string;
  params: Record<string, unknown>;
  fetchAll: boolean;
}
