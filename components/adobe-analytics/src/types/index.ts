interface PageableResponse {
  pageable: {
    sort: { sorted: boolean; unsorted: boolean; empty: boolean };
    pageSize: number;
    pageNumber: number;
    offset: number;
    unpaged: boolean;
    paged: boolean;
  };
  firstPage: boolean;
  nextPage: boolean;
  lastPage: boolean;
  previousPage: boolean;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface DiscoveryResponse {
  imsUserId: string;
  imsOrgs: Organization[];
}

export interface Organization {
  imsOrgId: string;
  companies: Company[];
}

export interface Company {
  globalCompanyId: string;
  companyName: string;
  apiRateLimitPolicy: string;
  dpc: string;
}

export interface ReportSuite {
  collectionItemType: string;
  id: string;
  rsid: string;
  name: string;
}

export interface ReportSuiteListResponse extends PageableResponse {
  content: ReportSuite[];
}

export interface ReportSuiteResponse {
  content: ReportSuite;
}

export interface ReportSuiteMetric {
  id: string;
  title: string;
  name: string;
  type: string;
  category: string;
  support: string[];
  allocation: boolean;
  precision: number;
  calculated: boolean;
  segmentable: boolean;
  supportsDataGovernance: boolean;
  polarity: string;
  standardComponent: boolean;
}

export interface ReportSuiteDimension {
  id: string;
  title: string;
  name: string;
  type: string;
  category: string;
  support: string[];
  pathable: boolean;
  segmentable: boolean;
  reportable: string[];
  supportsDataGovernance: boolean;
  description: string;
  multiValued: boolean;
  standardComponent: boolean;
}
