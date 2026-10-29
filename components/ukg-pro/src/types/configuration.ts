export interface Company {
  isMasterCompany: boolean;
  masterCompanyId: string;
  companyId: string;
  companyCode: string;
  companyDoingBusinessAsName: string | null;
  companyGLSegment: string | null;
  companyName: string;
  taxCalculationGroupId: string | null;
  contractNumber: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string | null;
  addressZipCode: string | null;
  addressCountry: string;
  addressCounty: string | null;
  phoneNumber: string;
  phoneNumberExtension: string | null;
  federalTaxId: string | null;
  otherFederalTaxId: string | null;
  organizationLevel1Label: string | null;
  organizationLevel2Label: string | null;
  organizationLevel3Label: string | null;
  organizationLevel4Label: string | null;
  currencyCode: string;
  dateOfBusinessClosure: string | null;
  usePositionManagement: boolean;
  useMultipleJobGroups: boolean;
  integrationRecordId: string;
}

export interface Job {
  countryCode: string;
  jobCode: string;
  title: string;
  jobFamilyCode: string;
  isActive: boolean;
  longDescription: string;
  jobEE0Category: string;
  jobGroup: string;
  flsaTypeCode: string;
  integrationRecordId: boolean;
  workEnvirornmentCode: string;
  workEnvironmentDesc: string;
}

export interface Location {
  locationCode: string;
  description: string;
  isActive: boolean;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zipOrPostalCode: string;
  countryCode: string;
  locationGLSegment: string;
}

export interface EmployeePosition {
  alternateTitle: string;
  companyId: string;
  dateTimeChanged: string;
  dateTimeCreated: string;
  employeeType: string;
  effectiveStartDate: string;
  effectiveStopDate: string;
  fundID: string;
  glSegment: string;
  isApproved: boolean;
  isEligibleForBenefits: boolean;
  isProrated: boolean;
  jobcode: string;
  locationCode: string;
  notes: string;
  organizationLevelCode1: string;
  organizationLevelCode2: string;
  organizationLevelCode3: string;
  organizationLevelCode4: string;
  overstaffingAllowed: boolean;
  payGroupCode: string;
  positionCode: string;
  projectCode: string;
  shiftGroupCode: string;
  statusCode: string;
  statusAsOfDate: string;
  userDefinedField01: string;
  userDefinedField02: string;
  userDefinedField03: number;
  userDefinedField04: UserDefinedField04;
  integrationRecordId: string;
}

export interface UserDefinedField04 {
  isNull: boolean;
  Value: number;
}
