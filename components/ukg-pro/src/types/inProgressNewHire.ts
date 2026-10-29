export interface InProgressNewHire {
  contactInformation: ContactInformation;
  job: Job;
  compensation: Compensation;
  mentor: Mentor;
  onboardingOwner: Mentor;
  onboardingStatus: string;
  referenceId: string;
  sentToProcessHireDate: string | null;
  launchedOn: LaunchedOn;
  hireDate: string;
  orientationDate: string;
  startDate: string;
  organizationLevels: OrganizationLevel[];
  provisioning: Provisioning;
  identityUserId: string;
  externalUserId: string;
  employeeNumber: string;
  ukgProStatus: string;
  personalMessage: string;
  pastStartDateReason: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Compensation {
  isFullTime: boolean;
  isSalaried: boolean;
  workHours: number;
  weeklyHours: number;
  currencyType: string;
  currency: Currency;
  payRate: number;
  ratePer: Currency;
}

export interface Currency {
  code: string;
  name: CurrencyName;
}

export interface CurrencyName {
  enUS: string;
}

export interface ContactInformation {
  name: ContactInformationName;
  emailAddress: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: Address;
}

export interface Address {
  line1: string;
  line2: string;
  city: string;
  postalCode: string;
  county: string;
  stateCode: string;
  countryCode: string;
  country: Currency;
}

export interface ContactInformationName {
  prefix: EmployeeType;
  first: string;
  middle: string;
  last: string;
  formerLast?: string;
  suffix: EmployeeType;
  preferredFirst: string;
}

export interface EmployeeType {
  id: string;
  name: CurrencyName;
}

export interface Job {
  id: string;
  code: string;
  name: JobName;
  requisitionId: string;
  selectedFLSAStatus: number;
  supervisor: Mentor;
  componentCompany: ComponentCompany;
  workLocation: ComponentCompany;
  employeeType: EmployeeType;
}

export interface ComponentCompany {
  id: string;
  name: string;
}

export interface JobName {
  enUS: string;
  esES: string;
}

export interface Mentor {
  id: string;
  name: ContactInformationName;
  email: string;
  externalUserId: string;
  description?: string;
}

export interface LaunchedOn {
  utcInstant: string;
  offset: string;
}

export interface OrganizationLevel {
  id: string;
  level: number;
  code: string;
  description: string;
}

export interface Provisioning {
  provisioningItems: ProvisioningItem[];
  summaryEmailRecipients: string[];
}

export interface ProvisioningItem {
  id: string;
  name: string;
  recipient: string;
  selectedOption: SelectedOption;
  comments: string;
}

export interface SelectedOption {
  id: string;
  description: string;
}
