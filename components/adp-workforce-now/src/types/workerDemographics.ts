import type {
  BusinessCommunication,
  CountrySubdivisionLevel1,
  CustomFieldGroup,
  Fax,
  Field,
  NameCodeDemographics,
  StandardPayPeriodHours,
  WorkerDates,
  WorkerID,
  WorkerStatus,
} from "./workers";

interface CodeDemographics {
  codeValue: string;
  shortName?: string;
  longName?: string;
}

interface EmailDemographics {
  emailUri: string;
  nameCode: NameCodeDemographics;
  notificationIndicator: boolean;
}

interface CommunicationDemographics {
  emails: EmailDemographics[];
  faxes: Fax[];
  landlines: Fax[];
  mobiles: Fax[];
  pagers: Fax[];
}

interface CodeFieldDemographics {
  itemID: string;
  nameCode: NameCodeDemographics;
  codeValue?: string;
  shortName?: string;
}

interface IndicatorFieldDemographics {
  itemID: string;
  nameCode: CodeDemographics;
}

interface CustomFieldGroupDemographics {
  codeFields: CodeFieldDemographics[];
  indicatorFields: IndicatorFieldDemographics[];
  numberFields: Field[];
  percentFields: Field[];
  stringFields: Field[];
}

interface LegalAddressDemographics {
  cityName: string;
  countryCode: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  lineOne: string;
  lineTwo: string;
  nameCode: CodeDemographics;
  postalCode: string;
}

interface LegalNameDemographics {
  familyName1: string;
  formattedName: string;
  givenName: string;
}

interface PersonDemographics {
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

interface StatusCodeClassDemographics {
  codeValue: string;
  shortName: string;
  longName: string;
}

interface Address {
  nameCode: StatusCodeClassDemographics;
  lineOne: string;
  cityName: string;
  countrySubdivisionLevel1: CountrySubdivisionLevel1;
  countryCode: string;
  postalCode: string;
}

interface AssignedWorkLocation {
  address: Address;
}

interface PayCycleCodeClass {
  codeValue: string;
  shortName: string;
}

interface AssignmentStatusDemographics {
  statusCode: StatusCodeClassDemographics;
  reasonCode: PayCycleCodeClass;
  effectiveDate: string;
}

interface PayrollProcessingStatusCode {
  shortName: string;
}

interface WorkAssignmentsDemographics {
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

export interface WorkerDemographics {
  associateOID: string;
  workerID: WorkerID;
  person: PersonDemographics;
  workerDates: WorkerDates;
  workerStatus: WorkerStatus;
  businessCommunication: BusinessCommunication;
  workAssignments: WorkAssignmentsDemographics[];
}
