//#region node_modules/axios/index.d.ts
type UppercaseMethod = 'GET' | 'DELETE' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'PATCH' | 'PURGE' | 'LINK' | 'UNLINK' | 'QUERY';
type Method = (UppercaseMethod | Lowercase<UppercaseMethod>) & {};
type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream' | 'formdata';
//#endregion
//#region src/types/configuration.d.ts
interface Job {
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
interface EmployeePosition {
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
interface UserDefinedField04 {
  isNull: boolean;
  Value: number;
}
//#endregion
//#region src/types/employee.d.ts
interface EmploymentDetails {
  companyID: string;
  companyCode: string;
  companyName: string;
  employeeID: string;
  jobDescription: string;
  payGroupDescription: string;
  primaryJobCode: string;
  orgLevel1Code: string;
  orgLevel2Code: string;
  orgLevel3Code: string;
  orgLevel4Code: string;
  originalHireDate: string;
  lastHireDate: string;
  fullTimeOrPartTimeCode: string;
  primaryWorkLocationCode: string;
  languageCode: string;
  primaryProjectCode: string;
  workPhoneNumber: string;
  workPhoneExtension: string;
  workPhoneCountry: string;
  dateInJob: string;
  dateLastWorked: string;
  dateOfBenefitSeniority: string;
  dateOfSeniority: string;
  deductionGroupCode: string;
  earningGroupCode: string;
  employeeTypeCode: string;
  employeeStatusCode: string;
  employeeNumber: string;
  jobChangeReasonCode: string;
  jobTitle: string;
  leaveReasonCode: string;
  supervisorID: string;
  supervisorFirstName: string;
  supervisorLastName: string;
  autoAllocate: string;
  clockCode: string;
  dateLastPayDatePaid: string;
  dateOfEarlyRetirement: string;
  dateOfLocalUnion: string;
  dateOfNationalUnion: string;
  dateOfRetirement: string;
  dateOfSuspension: string;
  dateOfTermination: string;
  datePaidThru: string;
  statusStartDate: string;
  hireSource: string;
  isAutoAllocated: string;
  isAutopaid: string;
  isMultipleJob: string;
  jobGroupCode: string;
  mailstop: string;
  okToRehire: string;
  payGroup: string;
  payPeriod: string;
  plannedLeaveReason: string;
  positionCode: string;
  salaryOrHourly: string;
  scheduledAnnualHrs: number;
  scheduledFTE: number;
  scheduledWorkHrs: number;
  shift: string;
  shiftGroup: string;
  termReason: string;
  terminationReasonDescription: string;
  termType: string;
  timeclockID: string;
  unionLocal: string;
  unionNational: string;
  weeklyHours: number;
  dateTimeCreated: string;
  dateTimeChanged: string;
  supervisorEmployeeNumber: string;
  supervisorCOID: string;
  supervisorCompanyCode: string;
  companyGLSegment: string;
  locationGLSegment: string;
}
interface EmployeeDetails {
  additionalName1: string;
  additionalName2: string;
  addressId: string;
  addressIsOnTaxBoundary: boolean;
  addressLatitude: number;
  cobraExport: string;
  cobraIsActive: boolean;
  cobraReason: string;
  cobraStatus: string;
  cobraStatusDate: string;
  communityBroadcastSmsCode: string;
  consentElectronicW2: boolean;
  consentElectronicw2pr: boolean;
  dateDeceased: string;
  dateOfCobraEvent: string;
  dateOfCobraExport: string;
  dateOfCobraLetter: string;
  dateOfI9Expiration: string;
  datetimeChanged: string;
  datetimeCreated: string;
  disabilityType: string;
  ethnicDescription: string;
  formerName: string;
  healthBloodType: string;
  healthEyes: string;
  healthHair: string;
  healthHeightFeet: string;
  healthHeightInches: string;
  healthLastDonateDate: string;
  healthWeight: number;
  i9AlienNumber: string;
  i9DocA: string;
  i9DocB: string;
  i9DocC: string;
  i9Verified: boolean;
  i9VisaType: string;
  i9WorkAuth: string;
  isDisabled: boolean;
  isMultiPayGroup: boolean;
  isSmoker: boolean;
  militaryService: boolean;
  militaryBranchServed: string;
  militaryEra: string;
  militaryIsDisabledVet: string;
  militaryIsOthEligVet: string;
  militaryIsOthEligVetBasis: string;
  militaryIsActiveWartimeVet: string;
  nameFormer: string;
  previousSSN: string;
  originCountry: string;
  originLocation: string;
  w2IsDeceased: boolean;
  cobraNotes: string;
  addressSms: string;
  militarySeparationDate: string;
  homePhoneIsPrivate: boolean;
  smsApprovals: boolean;
  smsPayNotification: boolean;
  i9VisaExpirationDate: string;
  militaryIsMedalVet: string;
  lastNameNotSameAsSSCard: string;
  chkCashingInstCode: string;
  nationality1: string;
  nationality2: string;
  nationality3: string;
  personId: string;
  employeeId: string;
  companyId: string;
  userName: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  namePrefixCode: string;
  nameSufixCode: string;
  emailAddress: string;
  emailAddressAlternate: string;
  homePhone: string;
  homePhoneCountry: string;
  addressLine1: string;
  addressLine2: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  addressCountry: string;
  addressCounty: string;
  nationalId: string;
  nationalIdCountry: string;
  dateOfBirth: string;
  gender: string;
  ethnicIDCode: string;
  maritalStatusCode: string;
  ssn: string;
  ssnIsSuppressed: boolean;
}
interface EmployeeChange {
  firstName: string;
  lastName: string;
  preferredName: string;
  emailAddress: string;
  countryCode: string;
  languageCode: string;
  employeeNumber: string;
  employeeId: string;
  personId: string;
  userIntegrationKey: string;
  companyName: string;
  companyId: string;
  supervisorId: string;
  salaryOrHourly: string;
  fullTimeOrPartTime: string;
  isActive: boolean;
  workLocationCode: string;
  jobCode: string;
  projectCode: string;
  orgLevel1Code: string;
  orgLevel2Code: string;
  orgLevel3Code: string;
  orgLevel4Code: string;
  middleName: string;
  workPhone: string;
  homePhone: string;
  employeeAddress1: string;
  employeeAddress2: string;
  city: string;
  state: string;
  zipCode: string;
  terminationDate: string;
  hireDate: string;
  supervisorName: string;
  suffix: string;
  prefix: string;
  alternateEmailAddress: string;
  gender: string;
  employeeStatus: string;
  employeeType: string;
  emplStatusStartDate: string;
  dateInJob: string;
  dateOfLastHire: string;
  jobGroupCode: string;
  alternateJobTitle: string;
}
interface EmployeeContractDetails {
  amendmentDate: null;
  companyId: string;
  contractEndDate: string;
  contractNumber: string;
  contractReason: string;
  contractStartDate: string;
  contractTypeCode: string;
  contractTypeDescription: string;
  dateTimeCreated: string;
  durationDays: number;
  durationMonths: number;
  durationWeeks: number;
  durationYears: number;
  employeeId: string;
  employmentContractId: number;
  fteContractHours: number;
  isAmendment: string;
  isRenewal: string;
  notes: null;
  noticePeriodDays: number;
  noticePeriodMonths: number;
  noticePeriodWeeks: number;
  noticePeriodYears: number;
  probationaryDays: number;
  rehirePeriodDays: number;
  rehirePeriodMonths: number;
  rehirePeriodWeeks: number;
  rehirePeriodYears: number;
  renewalContractId: number;
  rowLastChanged: string;
}
interface EmployeeDemographicDetails {
  ethnicDescription: string;
  additionalName1: string;
  additionalName2: string;
  addressId: string;
  addressIsOnTaxBoundary: string;
  addressLatitude: number;
  disabilityType: string;
  formerName: string;
  healthBloodType: string;
  healthEyes: string;
  healthHair: string;
  healthHeightFeet: string;
  healthHeightInches: string;
  healthLastDonateDate: string;
  healthWeight: number;
  previousSSN: string;
  originCountry: string;
  originLocation: string;
  addressSms: string;
  homePhoneIsPrivate: boolean;
  lastNameNotSameAsSSCard: string;
  nationality1: string;
  nationality2: string;
  nationality3: string;
  personId: string;
  employeeId: string;
  companyId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  preferredName: string;
  namePrefixCode: string;
  nameSuffixCode: string;
  emailAddress: string;
  emailAddressAlternate: string;
  homePhoneID: string;
  homePhone: string;
  homePhoneCountry: string;
  addressLine1: string;
  addressLine2: string;
  addressLine3: string;
  addressLine4: string;
  addressCity: string;
  addressState: string;
  addressZipCode: string;
  addressCountry: string;
  addressCounty: string;
  dateOfBirth: string;
  gender: string;
  ethnicIdCode: string;
  isSmoker: boolean;
  isDisabled: string;
  maritalStatusCode: string;
  ssn: string;
  ssnIsSuppressed: boolean;
  userID: string;
  integrationRecordId: string;
  cellPhoneNumber: string;
}
interface EmployeeEmploymentDetails {
  companyID: string;
  employeeID: string;
  homeCompany: string;
  isHomeCompany: boolean;
  isSupervisor: boolean;
  primaryJobCode: string;
  orgLevel1Code: string;
  orgLevel2Code: string;
  orgLevel3Code: string;
  orgLevel4Code: null;
  originalHireDate: string;
  lastHireDate: string;
  fullTimeOrPartTimeCode: string;
  primaryWorkLocationCode: string;
  languageCode: string;
  primaryProjectCode: null;
  workPhoneNumber: string;
  workPhoneExtension: string;
  workPhoneCountry: string;
  dateInJob: string;
  dateLastWorked: null;
  benefitSeniorityDate: string;
  seniorityDate: string;
  deductionGroupCode: string;
  earningGroupCode: string;
  jobChangeReasonCode: string;
  jobTitle: null;
  employeeTypeCode: string;
  employeeStatusCode: string;
  employeeNumber: string;
  leaveReasonCode: null;
  supervisorID: string;
  autoAllocate: string;
  clockCode: null;
  dateLastPayDatePaid: string;
  earlyRetirementDate: string;
  retirementDate: string;
  suspensionDate: null;
  terminationDate: null;
  payGroupCode: string;
  payPeriod: string;
  paidThruDate: null;
  employeeStatusStartDate: string;
  hireSource: string;
  isAutoAllocated: boolean;
  isAutoPaid: boolean;
  isHighlyCompensated: boolean;
  isMultipleJob: boolean;
  jobCode: string;
  jobGroupCode: string;
  annualSalary: number;
  mailstop: null;
  okToRehire: string;
  plannedLeaveReason: null;
  positionCode: null;
  salaryOrHourly: string;
  scheduledAnnualHours: number;
  scheduledFTE: number;
  scheduledWorkHours: number;
  shift: string;
  shiftGroup: string;
  terminationReasonCode: null;
  terminationDescription: null;
  termType: null;
  timeClockID: null;
  weeklyHours: number;
  dateTimeCreated: string;
  dateTimeChanged: string;
  employeeStatusExpectedEndDate: null;
  integrationRecordId: string;
  currentCompanyCountryCode: string;
  homeCompanyCountryCode: string;
  isKeyEmployee: boolean;
  hourlyPayRate: number;
  salaryEffectiveDate: string;
  unionLocalCode: null;
  unionNationalCode: null;
}
interface EmployeeJobHistoryDetails {
  annualSalary: number;
  companyId: string;
  dateTimeCreated: string;
  employeeId: string;
  employeeType: string;
  employeeStatus: string;
  flsaCategory: null;
  fullTimeOrPartTime: string;
  hourlyPayRate: number;
  isJobChange: boolean;
  isOrgchange: boolean;
  isOutsideGuidelines: boolean;
  isOutsideRange: boolean;
  isPromotion: boolean;
  isRateChange: boolean;
  isSystem: boolean;
  isTransfer: boolean;
  jobCode: string;
  jobDescription: string;
  jobEffectiveDate: string;
  jobGroupCode: null;
  locationCode: string;
  orgLevel1Code: string;
  orgLevel2Code: string;
  orgLevel3Code: null;
  orgLevel4Code: null;
  otherRate1: number;
  otherRate2: number;
  otherRate3: number;
  otherRate4: number;
  payGroupCode: string;
  payPeriodCode: null;
  payScaleCode: null;
  percentChange: number;
  periodPayRate: number;
  piecePayRate: number;
  positionCode: null;
  reasonCode: string;
  salaryGrade: string;
  salaryOrHourly: string;
  scheduledAnnualHours: number;
  scheduledFullTimeEquivalency: number;
  scheduledWorkHours: number;
  shiftCode: string;
  shiftGroupCode: string;
  stepNumber: number;
  supervisorId: null;
  supervisorNameFirst: null;
  supervisorNameLast: null;
  supervisorNameSuffix: null;
  supervisorNotInList: boolean;
  systemId: string;
  unionNational: null;
  unionLocal: null;
  usePayScales: boolean;
  weeklyPayRate: number;
  notes: null;
  homeCompanyId: string;
  integrationEffectiveDate: string;
  projectCode: null;
  numberOfPayments: number;
  weeklyHours: number;
  isViewableByEmployee: boolean;
  createdByUserId: number;
  jobTitle: null;
}
//#endregion
//#region src/types/polling.d.ts
interface NewHireStatusChange {
  newHireId: string;
  firstName: string;
  lastName: string;
  changeType: "NewHireAdded" | "StatusChange" | "ProgressUpdate";
  previousStatus?: string;
  currentStatus: string;
  previousProgress?: number;
  currentProgress?: number;
  detectedAt: string;
}
//#endregion
//#region src/types/utils.d.ts
interface PaginatedResponse<T> {
  data?: T[];
  items?: T[];
  results?: T[];
  employees?: T[];
  newHires?: T[];
  jobs?: T[];
  locations?: T[];
  positions?: T[];
  totalCount?: number;
  pageNumber?: number;
  pageSize?: number;
}
//#endregion
//#region npm-dist/.entry.d.ts
declare const _default: import("@prismatic-io/spectral").CallableComponent<{
  key: "ukg-pro";
  public: true;
  documentationUrl: "https://prismatic.io/docs/components/ukg-pro/";
  display: {
    label: string;
    description: string;
    iconPath: string;
    category: "Application Connectors";
  };
  actions: {
    rawRequest: import("@prismatic-io/spectral").ActionDefinition<{
      url: {
        comments: string;
        example: string;
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        clean: (value: unknown) => string;
      };
      method: {
        label: string;
        type: "string";
        required: true;
        model: {
          label: Method;
          value: Method;
        }[];
        comments: string;
        clean: (value: unknown) => string;
      };
      data: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
      };
      formData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileData: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      fileDataFileNames: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        clean: (values: any) => Record<string, string> | undefined;
      };
      queryParams: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
      };
      headers: {
        label: string;
        placeholder: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
      };
      responseType: {
        label: string;
        placeholder: string;
        type: "string";
        default: string;
        required: true;
        comments: string;
        model: {
          label: ResponseType;
          value: ResponseType;
        }[];
        clean: (value: unknown) => ResponseType;
      };
      timeout: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => number;
      };
      retryDelayMS: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      retryAllErrors: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      maxRetries: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        default: string;
        clean: (value: unknown) => number;
      };
      useExponentialBackoff: {
        label: string;
        type: "boolean";
        default: string;
        required: false;
        comments: string;
        clean: (value: unknown) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getJob: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      jobId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getSingleLocation: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      locationId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listCompanies: import("@prismatic-io/spectral").ActionDefinition<{
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      masterCompanyId: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      companyCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isMasterCompany: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: unknown[] | PaginatedResponse<unknown>;
    }>;
    listJobs: import("@prismatic-io/spectral").ActionDefinition<{
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<Job> | Job[];
    }>;
    listLocations: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      countryCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isActive: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    listPositions: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeType: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      payGroupCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      statusCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        model: {
          label: string;
          value: string;
        }[];
        clean: (value: unknown) => string | undefined;
      };
      positionCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown) => string | undefined;
      };
      projectCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      shiftGroupCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      isProrated: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isApproved: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      isElegibleForBenefits: {
        label: string;
        type: "boolean";
        required: false;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeePosition> | EmployeePosition[];
    }>;
    getImportFileStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getImportFileSummary: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      fileId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getImportStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      stagingId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getImportTransactionStatus: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    importXmlData: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      xmlTransaction: {
        label: string;
        type: "code";
        language: "xml";
        required: true;
        comments: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      uniqueFileName: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getAllEmploymentDetailsByCompany: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmploymentDetails> | EmploymentDetails[];
    }>;
    getAllPersonDetails: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeDetails> | EmployeeDetails[];
    }>;
    getEmployeeChangesByDate: import("@prismatic-io/spectral").ActionDefinition<{
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      startDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      endDate: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeChange> | EmployeeChange[];
    }>;
    getEmployeeChangesById: import("@prismatic-io/spectral").ActionDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      employeeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: any;
    }>;
    getEmployeeDemographicDetails: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeDemographicDetails> | EmployeeDemographicDetails[];
    }>;
    getEmployeeEmploymentDetails: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      primaryJobCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      primaryWorkLocationCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      primaryProjectCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      deductionGroupCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
      earningGroupCode: {
        label: string;
        type: "string";
        required: false;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown) => string | undefined;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeEmploymentDetails> | EmployeeEmploymentDetails[];
    }>;
    getEmployeeEmploymentDetailsByEmployeeIdAndCompanyId: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
      employeeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeEmploymentDetails> | EmployeeEmploymentDetails[];
    }>;
    getEmployeeJobHistory: import("@prismatic-io/spectral").ActionDefinition<{
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      employeeId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeJobHistoryDetails> | EmployeeJobHistoryDetails[];
    }>;
    getEmploymentContractDetails: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeContractDetails> | EmployeeContractDetails[];
    }>;
    getPersonDetailsByCompany: import("@prismatic-io/spectral").ActionDefinition<{
      filterParameters: {
        label: string;
        type: "string";
        collection: "keyvaluelist";
        required: false;
        comments: string;
        example: string;
        placeholder: string;
        clean: (value: unknown) => Record<string, unknown>;
      };
      pagination: {
        label: string;
        required: boolean;
        comments: string;
        inputs: {
          page: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
          perPage: {
            label: string;
            type: "string";
            required: false;
            comments: string;
            placeholder: string;
            example: string;
            clean: (value: unknown) => number | undefined;
          };
        };
      } & {
        type: "structuredObject";
      };
      fetchAll: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        label: string;
        type: "string";
        required: true;
        comments: string;
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      data: PaginatedResponse<EmployeeDetails> | EmployeeDetails[];
    }>;
  };
  connections: import("@prismatic-io/spectral").KeyedConnection<{
    key: "ukgProBasicAuth";
    display: {
      label: string;
      description: string;
    };
    inputs: {
      baseUrl: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      customerApiKey: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      username: {
        label: string;
        placeholder: string;
        type: "string";
        required: true;
        shown: true;
        comments: string;
        example: string;
      };
      password: {
        label: string;
        placeholder: string;
        type: "password";
        required: true;
        shown: true;
        comments: string;
      };
    };
  }, "ukgProBasicAuth">[];
  dataSources: {
    selectCompany: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectJob: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectLocation: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
    selectPosition: import("@prismatic-io/spectral").DataSourceDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      companyId: {
        required: boolean;
        dataSource: undefined;
        label: string;
        type: "string";
        comments: string;
        placeholder: string;
        example: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, "picklist">;
  };
  triggers: {
    pollEmployeeChanges: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      lookBackDate: {
        label: string;
        placeholder: string;
        type: "string";
        required: false;
        comments: string;
        example: string;
        clean: (value: unknown) => string;
      };
      companyId: {
        required: boolean;
        comments: string;
        label: string;
        type: "string";
        placeholder: string;
        example: string;
        dataSource: string;
        clean: (value: unknown, defaultValue?: string) => string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: EmployeeChange[];
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    pollNewHireStatus: import("@prismatic-io/spectral").PollingTriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>, boolean, {
      payload: {
        body: {
          data: NewHireStatusChange[];
          inProgressCount: number;
          completedCount: number;
        };
        headers: {
          [key: string]: string;
        };
        queryParameters: {
          [key: string]: string;
        };
        rawBody: {
          data: unknown;
          contentType?: string;
        };
        pathFragment: string;
        webhookUrls: {
          [key: string]: string;
        };
        webhookApiKeys: {
          [key: string]: string[];
        };
        invokeUrl: string;
        executionId: string;
        customer: import("@prismatic-io/spectral").CustomerAttributes;
        instance: import("@prismatic-io/spectral").InstanceAttributes;
        user: import("@prismatic-io/spectral").UserAttributes;
        integration: import("@prismatic-io/spectral").IntegrationAttributes;
        flow: import("@prismatic-io/spectral").FlowAttributes;
        startedAt: string;
        globalDebug: boolean;
        paginationState?: Record<string, unknown> | undefined;
      };
      polledNoChanges: boolean;
    }, import("@prismatic-io/spectral").Inputs>;
    webhookEmployeeLifecycle: import("@prismatic-io/spectral").TriggerDefinition<{
      connection: {
        label: string;
        type: "connection";
        required: true;
        comments: string;
      };
      webhookSecret: {
        label: string;
        type: "password";
        required: false;
        comments: string;
        placeholder: string;
        clean: (value: unknown) => string | undefined;
      };
      verifySignature: {
        label: string;
        type: "boolean";
        required: false;
        default: string;
        comments: string;
        clean: (value: unknown, defaultValue?: boolean) => boolean;
      };
    }, import("@prismatic-io/spectral").ConfigVarResultCollection, boolean, {
      payload: import("@prismatic-io/spectral").TriggerPayload<Record<string, unknown>>;
      response: import("@prismatic-io/spectral").HttpResponse;
    }, import("@prismatic-io/spectral").Inputs>;
  };
  hooks: {
    error: (error: unknown) => unknown;
  };
}>;
export = _default;