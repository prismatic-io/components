interface MaritalStatusCodeClass {
  codeValue: string;
  shortName: string;
}
export interface NameCodeDemographics {
  codeValue: string;
  shortName: string;
}
export interface Fax {
  access: string;
  areaDialing: string;
  countryDialing: string;
  dialNumber: string;
  formattedNumber: string;
  itemID: string;
  nameCode: MaritalStatusCodeClass | NameCodeDemographics;
}
interface BusinessCommunicationEmail {
  itemID: string;
  nameCode: MaritalStatusCodeClass;
  emailUri: string;
}
export interface BusinessCommunication {
  landlines: Fax[];
  mobiles: Fax[];
  faxes: Fax[];
  pagers: Fax[];
  emails: BusinessCommunicationEmail[];
}
interface CommunicationEmail {
  nameCode: MaritalStatusCodeClass;
  emailUri: string;
}
interface Communication {
  landlines: Fax[];
  mobiles: Fax[];
  faxes: Fax[];
  emails: CommunicationEmail[];
}
export interface Field {
  itemID: string;
  nameCode: NameCodeDemographics | MaritalStatusCodeClass;
}
export interface CustomFieldGroup {
  amountFields: Field[];
  stringFields: Field[];
}
interface EthnicityCodeClass {
  codeValue: string;
  shortName: string;
  longName: string;
}
interface NameCode {
  codeValue: string;
  longName: string;
}
interface GovernmentID {
  itemID: string;
  idValue: string;
  nameCode: NameCode;
  countryCode: string;
}
export interface CountrySubdivisionLevel1 {
  subdivisionType: string;
  codeValue: string;
  shortName: string;
}
interface LegalAddress {
  nameCode: MaritalStatusCodeClass;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  cityName: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  countryCode: string;
  postalCode: string;
}
interface LegalName {
  givenName: string;
  middleName: string;
  familyName1: string;
  formattedName: string;
}
interface SocialInsuranceProgram {
  nameCode: MaritalStatusCodeClass;
  coveredIndicator: boolean;
}
interface Person {
  birthDate: string;
  genderCode: EthnicityCodeClass;
  maritalStatusCode: MaritalStatusCodeClass;
  socialInsurancePrograms: SocialInsuranceProgram[];
  tobaccoUserIndicator: boolean;
  disabledIndicator: boolean;
  ethnicityCode: EthnicityCodeClass;
  raceCode: EthnicityCodeClass;
  customFieldGroup: CustomFieldGroup;
  governmentIDs: GovernmentID[];
  legalName: LegalName;
  legalAddress: LegalAddress;
  communication: Communication;
}
interface OrganizationalUnit {
  nameCode: MaritalStatusCodeClass;
  typeCode: MaritalStatusCodeClass;
}
interface AssignmentStatus {
  statusCode: MaritalStatusCodeClass;
}
interface PayPeriodRateAmount {
  nameCode: MaritalStatusCodeClass;
  amountValue: number;
  currencyCode: string;
}
interface BaseRemuneration {
  payPeriodRateAmount: PayPeriodRateAmount;
  effectiveDate: string;
}
export interface StandardPayPeriodHours {
  hoursQuantity: number;
}
interface WorkAssignment {
  itemID: string;
  primaryIndicator: boolean;
  hireDate: string;
  actualStartDate: string;
  assignmentStatus: AssignmentStatus;
  jobCode: MaritalStatusCodeClass;
  jobTitle: string;
  positionID: string;
  homeOrganizationalUnits: OrganizationalUnit[];
  assignedOrganizationalUnits: OrganizationalUnit[];
  payCycleCode: MaritalStatusCodeClass;
  standardPayPeriodHours: StandardPayPeriodHours;
  baseRemuneration: BaseRemuneration;
  payrollGroupCode: string;
  payrollScheduleGroupID: string;
  payrollFileNumber: string;
  managementPositionIndicator: boolean;
}
export interface WorkerDates {
  originalHireDate: string;
}
export interface WorkerID {
  idValue: string;
}
interface StatusCode {
  codeValue: string;
}
export interface WorkerStatus {
  statusCode: StatusCode;
}
export interface Worker {
  associateOID: string;
  workerID: WorkerID;
  person: Person;
  workerDates: WorkerDates;
  workerStatus: WorkerStatus;
  businessCommunication: BusinessCommunication;
  workAssignments: WorkAssignment[];
}
