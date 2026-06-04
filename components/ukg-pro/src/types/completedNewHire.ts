export interface CompletedNewHire {
  contactInformation: ContactInformation;
  job: Job;
  compensation: Compensation;
  mentor: Mentor;
  onboardingOwner: OnboardingOwner;
  organizationLevels: string | null;
  provisioning: string | null;
  sentToProcessHireDate: LaunchedOn;
  launchedOn: LaunchedOn;
  hireDate: string;
  orientationDate: string;
  startDate: string;
  identityUserId: string;
  externalUserId: string;
  onboardingStatus: string;
  referenceId: string | null;
  personalMessage: string;
  pastStartDateReason: string | null;
  employeeNumber: string | null;
  ukgProStatus: string;
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface Compensation {
  isFullTime: boolean;
  isSalaried: boolean;
  workHours: number;
  weeklyHours: string | null;
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
  line2: string | null;
  city: string;
  postalCode: string;
  county: string | null;
  stateCode: string;
  countryCode: string;
  country: Country;
}

export interface Country {
  code: string;
  name: CountryName;
}

export interface CountryName {
  enUS: string;
  nlNL: string;
  frCA: string;
  frFR: string;
  deDE: string;
  itIT: string;
  msMY: string;
  phPH: string;
  ptBR: string;
  esES: string;
}

export interface ContactInformationName {
  prefix: EmployeeType | string | null;
  first: string;
  middle: null | string;
  last: string;
  formerLast: string | null;
  suffix: string | null;
  preferredFirst: null | string;
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
  email: null | string;
  externalUserId: null | string;
  description?: string;
}

export interface LaunchedOn {
  utcInstant: string;
  offset: string;
}

export interface OnboardingOwner {
  id: string;
  name: ContactInformationName;
  email: string;
  externalUserId: string;
}
