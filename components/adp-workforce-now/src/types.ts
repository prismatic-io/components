export interface PersistedToken {
  accessToken: string;
  expiresDate: number;
}

export interface ConsumerApplicationSubscription {
  events: Event[];
}

export interface Event {
  eventStatusCode: EventStatusCode;
  data: Data;
  eventID: string;
  eventNameCode: Code;
  recordDateTime: string;
  creationDateTime: string;
  effectiveDateTime: string;
  serviceCategoryCode: Code;
  actor: Tor;
  originator: Tor;
}

export interface Tor {
  associateOID: string;
}

export interface Data {
  output: Output;
}

export interface Output {
  consumerApplicationSubscriptionCredentials: ConsumerApplicationSubscriptionCredential[];
}

export interface ConsumerApplicationSubscriptionCredential {
  subscriberOrganizationOID: string;
  clientID: string;
  clientSecret: string;
}

export interface Code {
  codeValue: string;
}

export interface EventStatusCode {
  codeValue: string;
  shortName: string;
}

export interface WorkersList {
  workers: Worker[];
  meta: null;
  confirmMessage: null;
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

export interface BusinessCommunication {
  landlines: Fax[];
  mobiles: Fax[];
  faxes: Fax[];
  pagers: Fax[];
  emails: BusinessCommunicationEmail[];
}

export interface BusinessCommunicationEmail {
  itemID: string;
  nameCode: MaritalStatusCodeClass;
  emailUri: string;
}

export interface MaritalStatusCodeClass {
  codeValue: string;
  shortName: string;
}

export interface Person {
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

export interface Communication {
  landlines: Fax[];
  mobiles: Fax[];
  faxes: Fax[];
  emails: CommunicationEmail[];
}

export interface CommunicationEmail {
  nameCode: MaritalStatusCodeClass;
  emailUri: string;
}

export interface CustomFieldGroup {
  amountFields: Field[];
  stringFields: Field[];
}

export interface EthnicityCodeClass {
  codeValue: string;
  shortName: string;
  longName: string;
}

export interface GovernmentID {
  itemID: string;
  idValue: string;
  nameCode: NameCode;
  countryCode: string;
}

export interface NameCode {
  codeValue: string;
  longName: string;
}

export interface LegalAddress {
  nameCode: MaritalStatusCodeClass;
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  cityName: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  countryCode: string;
  postalCode: string;
}

export interface CountrySubdivisionLevel1 {
  subdivisionType: string;
  codeValue: string;
  shortName: string;
}

export interface LegalName {
  givenName: string;
  middleName: string;
  familyName1: string;
  formattedName: string;
}

export interface SocialInsuranceProgram {
  nameCode: MaritalStatusCodeClass;
  coveredIndicator: boolean;
}

export interface WorkAssignment {
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

export interface OrganizationalUnit {
  nameCode: MaritalStatusCodeClass;
  typeCode: MaritalStatusCodeClass;
}

export interface AssignmentStatus {
  statusCode: MaritalStatusCodeClass;
}

export interface BaseRemuneration {
  payPeriodRateAmount: PayPeriodRateAmount;
  effectiveDate: string;
}

export interface PayPeriodRateAmount {
  nameCode: MaritalStatusCodeClass;
  amountValue: number;
  currencyCode: string;
}

export interface WorkerDates {
  originalHireDate: string;
}

export interface WorkerID {
  idValue: string;
}

export interface WorkerStatus {
  statusCode: StatusCode;
}

export interface StatusCode {
  codeValue: string;
}



export interface WorkerDemographics {
  associateOID: string;
  workerID: WorkerID;
  person: PersonDemographics;
  workerDates: WorkerDates;
  workerStatus: WorkerStatus;
  businessCommunication: BusinessCommunication;
  workAssignments: WorkAssignmentsDemographics[];
}

export interface PersonDemographics {
  communication: CommunicationDemographics;
  customFieldGroup: CustomFieldGroupDemographics;
  disabledIndicator: boolean;
  genderCode: CodeDemographics;
  legalAddress: LegalAddressDemographics;
  legalName: LegalNameDemographics;
  militaryClassificationCodes: unknown[];
  preferredName: unknown;
  tobaccoUserIndicator: boolean;
}

export interface CommunicationDemographics {
  emails: EmailDemographics[];
  faxes: Fax[];
  landlines: Fax[];
  mobiles: Fax[];
  pagers: Fax[];
}

export interface EmailDemographics {
  emailUri: string;
  nameCode: NameCodeDemographics;
  notificationIndicator: boolean;
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

export interface CustomFieldGroupDemographics {
  codeFields: CodeFieldDemographics[];
  indicatorFields: IndicatorFieldDemographics[];
  numberFields: Field[];
  percentFields: Field[];
  stringFields: Field[];
}

export interface CodeFieldDemographics {
  codeValue?: string;
  itemID: string;
  nameCode: NameCodeDemographics;
  shortName?: string;
}

export interface IndicatorFieldDemographics {
  itemID: string;
  nameCode: CodeDemographics;
}

export interface CodeDemographics {
  codeValue: string;
  shortName?: string;
  longName?: string;
}

export interface Field {
  itemID: string;
  nameCode: NameCodeDemographics | MaritalStatusCodeClass;
}

export interface LegalAddressDemographics {
  cityName: string;
  countryCode: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  lineOne: string;
  lineTwo: string;
  nameCode: CodeDemographics;
  postalCode: string;
}

export interface LegalNameDemographics {
  familyName1: string;
  formattedName: string;
  givenName: string;
}

export interface WorkAssignmentsDemographics {
  itemID: string;
  primaryIndicator: boolean;
  hireDate: string;
  actualStartDate: string;
  terminationDate: string;
  assignmentStatus: AssignmentStatusDemographics;
  positionID: string;
  assignedWorkLocations: AssignedWorkLocation[];
  payCycleCode: PayCycleCodeClass;
  standardPayPeriodHours: StandardPayPeriodHours;
  payrollProcessingStatusCode: PayrollProcessingStatusCode;
  payrollGroupCode: string;
  payrollFileNumber: string;
  customFieldGroup: CustomFieldGroup;
  customCountryInputs: unknown[];
}

export interface AssignedWorkLocation {
  address: Address;
}

export interface Address {
  nameCode: StatusCodeClassDemographics;
  lineOne: string;
  cityName: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  countryCode: string;
  postalCode: string;
}

export interface StatusCodeClassDemographics {
  codeValue: string;
  shortName: string;
  longName: string;
}

export interface AssignmentStatusDemographics {
  statusCode: StatusCodeClassDemographics;
  reasonCode: PayCycleCodeClass;
  effectiveDate: string;
}

export interface PayCycleCodeClass {
  codeValue: string;
  shortName: string;
}

export interface PayrollProcessingStatusCode {
  shortName: string;
}

export interface StandardPayPeriodHours {
  hoursQuantity: number;
}

export interface PersonalContact {
  itemID: string;
  personName: { formattedName: string };
}
