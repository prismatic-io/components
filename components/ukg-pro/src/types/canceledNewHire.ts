export interface CanceledNewHire {
  contactInformation: ContactInformation;
  job: Job;
  compensation: Compensation;
  mentor: Mentor;
  onboardingOwner: Mentor;
  organizationLevels: string | null;
  provisioning: string | null;
  sentToProcessHireDate: string | null;
  launchedOn: string | null;
  hireDate: string | null;
  orientationDate: string | null;
  startDate: string | null;
  identityUserId: string;
  externalUserId: string | null;
  onboardingStatus: string;
  referenceId: string | null;
  personalMessage: string;
  pastStartDateReason: string | null;
  employeeNumber: string | null;
  ukgProStatus: string;
  id: string;
  createdAt: string | null;
  updatedAt: string | null;
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
  prefix: Prefix | string | null;
  first: string;
  middle: string | null;
  last: string;
  formerLast: string | null;
  suffix: string | null;
  preferredFirst: string | null;
}

export interface Prefix {
  id: string;
  name: CurrencyName;
}

export interface Job {
  id: string;
  code: string;
  name: JobName;
  requisitionId: string;
  selectedFLSAStatus: number;
  supervisor: string | null;
  componentCompany: ComponentCompany;
  workLocation: ComponentCompany;
  employeeType: string | null;
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
  description?: string;
  externalUserId: null | string;
}
