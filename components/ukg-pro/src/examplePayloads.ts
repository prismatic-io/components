

















import type { CanceledNewHire } from "./types/canceledNewHire";
import type { CompletedNewHire } from "./types/completedNewHire";
import type { InProgressNewHire } from "./types/inProgressNewHire";








export const listCompaniesExamplePayload = {
  data: [
    {
      isMasterCompany: "Y",
      masterCompanyId: "MASTER001",
      companyID: "COMP-12345",
      companyCode: "ACME01",
      companyName: "ACME Corporation",
      addressLine1: "123 Business Park Drive",
      addressLine2: "Suite 400",
      addressCity: "San Francisco",
      addressState: "CA",
      addressZipCode: "94105",
      addressCountry: "USA",
      addressCounty: "San Francisco County",
      phoneNumber: "415-555-0100",
      phoneNumberExtension: "1001",
      federalTaxId: "12-3456789",
      orgLevel1Code: "CORP",
      orgLevel2Code: "USA",
      orgLevel3Code: "WEST",
      orgLevel4Code: "CAHQ",
    },
  ],
};












export const getJobExamplePayload = {
  data: {
    countryCode: "USA",
    jobCode: "SW-ENG-001",
    title: "Software Engineer",
    jobFamilyCode: "ENG",
    isActive: true,
    longDescription: "Designs, develops, and maintains software applications and systems.",
    jobEE0Category: "Professional",
    jobGroup: "Engineering",
    flsaTypeCode: "EXEMPT",
    integrationRecordId: "JOB-ENG-SW-001",
    workEnvirornmentCode: "OFFICE",
    workEnvironmentDesc: "Office Environment",
  },
};






export const listJobsExamplePayload = {
  data: [getJobExamplePayload.data],
};





export const listLocationsExamplePayload = {
  data: {
    locations: [
      {
        locationCode: "ALBUQ",
        description: "Albuquerque, NM",
        isActive: true,
        addressLine1: "618 Rio Grande Blvd NW",
        addressLine2: "",
        city: "Albuquerque",
        state: "NM",
        zipOrPostalCode: "87104",
        countryCode: "USA",
        locationGLSegment: "120",
      },
    ],
    totalCount: 3,
    pageNumber: 1,
    pageSize: 100,
  },
};

export const getSingleLocationExamplePayload = {
  data: listLocationsExamplePayload.data.locations[0],
};












export const listPositionsExamplePayload = {
  data: [
    {
      alternateTitle: "Senior Software Engineer",
      companyId: "COMP-12345",
      dateTimeChanged: "2024-01-15T14:30:00.000Z",
      dateTimeCreated: "2023-06-10T09:00:00.000Z",
      employeeType: "REG",
      effectiveStartDate: "2023-06-15T00:00:00.000Z",
      effectiveStopDate: "2025-06-15T00:00:00.000Z",
      fundID: "FUND-001",
      glSegment: "6000",
      isApproved: true,
      isEligibleForBenefits: true,
      isProrated: false,
      jobcode: "SW-ENG-001",
      locationCode: "SF-WEST",
      notes: "Key technical position for platform engineering team",
      organizationLevelCode1: "CORP",
      organizationLevelCode2: "ENG",
      organizationLevelCode3: "PLATFORM",
      organizationLevelCode4: "BACKEND",
      overstaffingAllowed: false,
      payGroupCode: "EXEMPT",
      positionCode: "POS-ENG-001",
      projectCode: "PROJ-001",
      shiftGroupCode: "DAY",
      statusCode: "ACTIVE",
      statusAsOfDate: "2023-06-15T00:00:00.000Z",
      userDefinedField01: "Custom data 1",
      userDefinedField02: "2024-01-01T00:00:00.000Z",
      userDefinedField03: 100,
      userDefinedField04: {
        isNull: false,
        Value: 85000,
      },
      integrationRecordId: "INT-POS-ENG-001",
    },
  ],
};





export const getAllPersonDetailsExamplePayload = {
  data: [
    {
      additionalName1: "string",
      additionalName2: "string",
      addressId: "00000000-0000-0000-0000-000000000000",
      addressIsOnTaxBoundary: true,
      addressLatitude: 0,
      cobraExport: "string",
      cobraIsActive: true,
      cobraReason: "string",
      cobraStatus: "string",
      cobraStatusDate: "2026-01-14T18:10:21.710Z",
      communityBroadcastSmsCode: "string",
      consentElectronicW2: true,
      consentElectronicw2pr: true,
      dateDeceased: "2026-01-14T18:10:21.710Z",
      dateOfCobraEvent: "2026-01-14T18:10:21.710Z",
      dateOfCobraExport: "2026-01-14T18:10:21.710Z",
      dateOfCobraLetter: "2026-01-14T18:10:21.710Z",
      dateOfI9Expiration: "2026-01-14T18:10:21.710Z",
      datetimeChanged: "2026-01-14T18:10:21.710Z",
      datetimeCreated: "2026-01-14T18:10:21.710Z",
      disabilityType: "string",
      ethnicDescription: "string",
      formerName: "string",
      healthBloodType: "string",
      healthEyes: "string",
      healthHair: "string",
      healthHeightFeet: "string",
      healthHeightInches: "string",
      healthLastDonateDate: "2026-01-14T18:10:21.710Z",
      healthWeight: 0,
      i9AlienNumber: "string",
      i9DocA: "string",
      i9DocB: "string",
      i9DocC: "string",
      i9Verified: true,
      i9VisaType: "string",
      i9WorkAuth: "string",
      isDisabled: true,
      isMultiPayGroup: true,
      isSmoker: true,
      militaryService: true,
      militaryBranchServed: "string",
      militaryEra: "string",
      militaryIsDisabledVet: "string",
      militaryIsOthEligVet: "string",
      militaryIsOthEligVetBasis: "string",
      militaryIsActiveWartimeVet: "string",
      nameFormer: "string",
      previousSSN: "string",
      originCountry: "string",
      originLocation: "string",
      w2IsDeceased: true,
      cobraNotes: "string",
      addressSms: "string",
      militarySeparationDate: "2026-01-14T18:10:21.710Z",
      homePhoneIsPrivate: true,
      smsApprovals: true,
      smsPayNotification: true,
      i9VisaExpirationDate: "2026-01-14T18:10:21.710Z",
      militaryIsMedalVet: "string",
      lastNameNotSameAsSSCard: "string",
      chkCashingInstCode: "string",
      nationality1: "string",
      nationality2: "string",
      nationality3: "string",
      personId: "00000000-0000-0000-0000-000000000000",
      employeeId: "string",
      companyId: "string",
      userName: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
      preferredName: "string",
      namePrefixCode: "string",
      nameSufixCode: "string",
      emailAddress: "string",
      emailAddressAlternate: "string",
      homePhone: "string",
      homePhoneCountry: "string",
      addressLine1: "string",
      addressLine2: "string",
      addressCity: "string",
      addressState: "string",
      addressZipCode: "string",
      addressCountry: "string",
      addressCounty: "string",
      nationalId: "string",
      nationalIdCountry: "string",
      dateOfBirth: "2026-01-14T18:10:21.710Z",
      gender: "string",
      ethnicIDCode: "string",
      maritalStatusCode: "string",
      ssn: "string",
      ssnIsSuppressed: true,
    },
  ],
};

export const getPersonDetailsByCompanyExamplePayload = {
  data: [getAllPersonDetailsExamplePayload.data[0]],
};














export const getEmployeeDemographicDetailsExamplePayload = {
  data: [
    {
      ethnicDescription: "White (Not Hispanic or Latino)",
      additionalName1: null,
      additionalName2: null,
      addressId: "ADDR-98765",
      addressIsOnTaxBoundary: "N",
      addressLatitude: 37.7749,
      disabilityType: null,
      formerName: null,
      healthBloodType: "O+",
      healthEyes: "Brown",
      healthHair: "Black",
      healthHeightFeet: "5",
      healthHeightInches: "10",
      healthLastDonateDate: "2023-08-15T00:00:00.000Z",
      healthWeight: 175,
      previousSSN: null,
      originCountry: "USA",
      originLocation: "California",
      addressSms: "555-987-6543",
      homePhoneIsPrivate: false,
      lastNameNotSameAsSSCard: "N",
      nationality1: "American",
      nationality2: null,
      nationality3: null,
      personId: "PERSON-12345",
      employeeId: "EMP-12345",
      companyId: "COMP-001",
      firstName: "John",
      middleName: "Michael",
      lastName: "Doe",
      preferredName: "Johnny",
      namePrefixCode: "MR",
      nameSuffixCode: null,
      emailAddress: "john.doe@example.com",
      emailAddressAlternate: "j.doe.personal@email.example.com",
      homePhoneID: "PHONE-HOME-001",
      homePhone: "555-123-4567",
      homePhoneCountry: "USA",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      addressLine3: null,
      addressLine4: null,
      addressCity: "San Francisco",
      addressState: "CA",
      addressZipCode: "94105",
      addressCountry: "USA",
      addressCounty: "San Francisco County",
      dateOfBirth: "1985-03-15T00:00:00.000Z",
      gender: "M",
      ethnicIdCode: "WHITE",
      isSmoker: false,
      isDisabled: "N",
      maritalStatusCode: "M",
      ssn: "XXX-XX-6789",
      ssnIsSuppressed: false,
      userID: "USER-12345",
      integrationRecordId: "INT-EMP-12345",
      cellPhoneNumber: "555-987-6543",
    },
  ],
};





export const getEmployeeEmploymentDetailsExamplePayload = {
  data: [
    {
      companyID: "6Y4NV",
      employeeID: "EQKKKU000020",
      homeCompany: "6Y4NV",
      isHomeCompany: true,
      isSupervisor: false,
      primaryJobCode: "CAADMIN",
      orgLevel1Code: "ADMIN",
      orgLevel2Code: "CSTSVR",
      orgLevel3Code: "CAN",
      orgLevel4Code: null,
      originalHireDate: "2021-09-20T00:00:00",
      lastHireDate: "2021-09-20T00:00:00",
      fullTimeOrPartTimeCode: "F",
      primaryWorkLocationCode: "CAHQ1",
      languageCode: "EN",
      primaryProjectCode: null,
      workPhoneNumber: "9056263314",
      workPhoneExtension: "1437",
      workPhoneCountry: "CAN",
      dateInJob: "2021-09-20T00:00:00",
      dateLastWorked: null,
      benefitSeniorityDate: "2021-09-20T00:00:00",
      seniorityDate: "2021-09-20T00:00:00",
      deductionGroupCode: "CABN",
      earningGroupCode: "CAHRY",
      jobChangeReasonCode: "301",
      jobTitle: null,
      employeeTypeCode: "REG",
      employeeStatusCode: "A",
      employeeNumber: "000012444",
      leaveReasonCode: null,
      supervisorID: "96ZZ520000K0",
      autoAllocate: "N",
      clockCode: null,
      dateLastPayDatePaid: "2023-05-12T00:00:00",
      earlyRetirementDate: "2060-06-15T00:00:00",
      retirementDate: "2063-06-15T00:00:00",
      suspensionDate: null,
      terminationDate: null,
      payGroupCode: "CAHOUR",
      payPeriod: "W",
      paidThruDate: null,
      employeeStatusStartDate: "2021-09-20T00:00:00",
      hireSource: "WEB",
      isAutoAllocated: false,
      isAutoPaid: true,
      isHighlyCompensated: false,
      isMultipleJob: true,
      jobCode: "CAADMIN",
      jobGroupCode: "ADMN",
      annualSalary: 58240.0,
      mailstop: null,
      okToRehire: "N",
      plannedLeaveReason: null,
      positionCode: null,
      salaryOrHourly: "H",
      scheduledAnnualHours: 2080.0,
      scheduledFTE: 1.0,
      scheduledWorkHours: 40.0,
      shift: "Z",
      shiftGroup: "Z",
      terminationReasonCode: null,
      terminationDescription: null,
      termType: null,
      timeClockID: null,
      weeklyHours: 0.0,
      dateTimeCreated: "2023-03-29T08:24:30.16",
      dateTimeChanged: "2023-03-29T11:43:28.927",
      employeeStatusExpectedEndDate: null,
      integrationRecordId: "6d600600-ee9e-46fb-b9da-5c256e71404c",
      currentCompanyCountryCode: "CAN",
      homeCompanyCountryCode: "CAN",
      isKeyEmployee: false,
      hourlyPayRate: 28.0,
      salaryEffectiveDate: "2021-09-20T00:00:00",
      unionLocalCode: null,
      unionNationalCode: null,
    },
  ],
};










export const getAllEmploymentDetailsByCompanyExamplePayload = {
  data: [
    {
      companyID: "COMP-12345",
      companyCode: "ACME01",
      companyName: "ACME Corporation",
      employeeID: "EMP-12345",
      jobDescription: "Software Engineer",
      payGroupDescription: "Salaried Exempt",
      primaryJobCode: "SW-ENG-001",
      orgLevel1Code: "CORP",
      orgLevel2Code: "ENG",
      orgLevel3Code: "PLATFORM",
      orgLevel4Code: "BACKEND",
      originalHireDate: "2020-03-15T00:00:00.000Z",
      lastHireDate: "2020-03-15T00:00:00.000Z",
      fullTimeOrPartTimeCode: "F",
      primaryWorkLocationCode: "SF-WEST",
      languageCode: "EN",
      primaryProjectCode: "PROJ-001",
      workPhoneNumber: "415-555-0100",
      workPhoneExtension: "1234",
      workPhoneCountry: "USA",
      dateInJob: "2023-01-10T00:00:00.000Z",
      dateLastWorked: null,
      dateOfBenefitSeniority: "2020-03-15T00:00:00.000Z",
      dateOfSeniority: "2020-03-15T00:00:00.000Z",
      deductionGroupCode: "EXEMPT",
      earningGroupCode: "SALARY",
      employeeTypeCode: "REG",
      employeeStatusCode: "A",
      employeeNumber: "E12345",
      jobChangeReasonCode: "PROMOTION",
      jobTitle: "Senior Software Engineer",
      leaveReasonCode: null,
      supervisorID: "EMP-98765",
      supervisorFirstName: "Jane",
      supervisorLastName: "Smith",
      autoAllocate: "N",
      clockCode: null,
      dateLastPayDatePaid: "2024-01-26T00:00:00.000Z",
      dateOfEarlyRetirement: null,
      dateOfLocalUnion: null,
      dateOfNationalUnion: null,
      dateOfRetirement: "2055-03-15T00:00:00.000Z",
      dateOfSuspension: null,
      dateOfTermination: null,
      datePaidThru: "2024-01-26T00:00:00.000Z",
      statusStartDate: "2020-03-15T00:00:00.000Z",
      hireSource: "RECRUITING",
      isAutoAllocated: "N",
      isAutopaid: "Y",
      isMultipleJob: "N",
      jobGroupCode: "ENG",
      mailstop: "MS-400",
      okToRehire: "Y",
      payGroup: "EXEMPT",
      payPeriod: "BIWEEKLY",
      plannedLeaveReason: null,
      positionCode: "POS-ENG-001",
      salaryOrHourly: "S",
      scheduledAnnualHrs: 2080,
      scheduledFTE: 1.0,
      scheduledWorkHrs: 40,
      shift: "DAY",
      shiftGroup: "STANDARD",
      termReason: null,
      terminationReasonDescription: null,
      termType: null,
      timeclockID: null,
      unionLocal: null,
      unionNational: null,
      weeklyHours: 40,
      dateTimeCreated: "2020-03-10T08:00:00.000Z",
      dateTimeChanged: "2024-01-15T14:30:00.000Z",
      supervisorEmployeeNumber: "E98765",
      supervisorCOID: "COMP-12345",
      supervisorCompanyCode: "ACME01",
      companyGLSegment: "1000",
      locationGLSegment: "1200",
    },
  ],
};





export const getEmployeeContractDetailsExamplePayload = {
  data: [
    {
      amendmentDate: null,
      companyId: "6Y4NV",
      contractEndDate: "2025-04-09T14:26:14.763",
      contractNumber: "FGB2388",
      contractReason: "EXWORKFORCE",
      contractStartDate: "2022-04-09T14:26:14.763",
      contractTypeCode: "FIXED",
      contractTypeDescription: "Fixed Term",
      dateTimeCreated: "2015-09-17T10:02:41.287",
      durationDays: 0.0,
      durationMonths: 0.0,
      durationWeeks: 0.0,
      durationYears: 3.0,
      employeeId: "9704HG0010K0",
      employmentContractId: 5.0,
      fteContractHours: 40.0,
      isAmendment: "N",
      isRenewal: "N",
      notes: null,
      noticePeriodDays: 180.0,
      noticePeriodMonths: 0.0,
      noticePeriodWeeks: 0.0,
      noticePeriodYears: 0.0,
      probationaryDays: 60.0,
      rehirePeriodDays: 0.0,
      rehirePeriodMonths: 3.0,
      rehirePeriodWeeks: 0.0,
      rehirePeriodYears: 0.0,
      renewalContractId: 0.0,
      rowLastChanged: "2022-05-09T14:26:14.763",
    },
  ],
};





export const getEmployeeJobHistoryExamplePayload = {
  data: [
    {
      annualSalary: 100000.0,
      companyId: "1E4P1",
      dateTimeCreated: "2010-05-27T21:26:53.05",
      employeeId: "81E8SL0000K0",
      employeeType: "REG",
      employeeStatus: "A",
      flsaCategory: null,
      fullTimeOrPartTime: "F",
      hourlyPayRate: 0.0,
      isJobChange: false,
      isOrgchange: false,
      isOutsideGuidelines: false,
      isOutsideRange: false,
      isPromotion: false,
      isRateChange: false,
      isSystem: true,
      isTransfer: false,
      jobCode: "HRMGRF",
      jobDescription: "HR Manager",
      jobEffectiveDate: "2010-01-01T00:00:00",
      jobGroupCode: null,
      locationCode: "0",
      orgLevel1Code: "ADMIN",
      orgLevel2Code: "HR",
      orgLevel3Code: null,
      orgLevel4Code: null,
      otherRate1: 0.0,
      otherRate2: 0.0,
      otherRate3: 0.0,
      otherRate4: 0.0,
      payGroupCode: "0",
      payPeriodCode: null,
      payScaleCode: null,
      percentChange: 0.0,
      periodPayRate: 0.0,
      piecePayRate: 0.0,
      positionCode: null,
      reasonCode: "100",
      salaryGrade: "0",
      salaryOrHourly: "S",
      scheduledAnnualHours: 0.0,
      scheduledFullTimeEquivalency: 0.0,
      scheduledWorkHours: 0.0,
      shiftCode: "0",
      shiftGroupCode: "Z",
      stepNumber: 0.0,
      supervisorId: null,
      supervisorNameFirst: null,
      supervisorNameLast: null,
      supervisorNameSuffix: null,
      supervisorNotInList: false,
      systemId: "81E8SM0020K0",
      unionNational: null,
      unionLocal: null,
      usePayScales: false,
      weeklyPayRate: 0.0,
      notes: null,
      homeCompanyId: "1E4P1",
      integrationEffectiveDate: "2010-01-01T00:00:00",
      projectCode: null,
      numberOfPayments: 0.0,
      weeklyHours: 0.0,
      isViewableByEmployee: true,
      createdByUserId: 0.0,
      jobTitle: null,
    },
  ],
};





export const getEmployeeChangesByIdExamplePayload = {
  data: {
    employeeId: "EMP-12345",
    companyId: "COMP-001",
    changes: [
      {
        changeId: "CHG-789012",
        changeType: "Update",
        changeTypeCode: "UPD",
        changeCategory: "Job Information",
        changeCategoryCode: "JOB",
        field: "jobTitle",
        fieldDisplayName: "Job Title",
        oldValue: "Software Engineer",
        newValue: "Senior Software Engineer",
        changeTimestamp: "2024-01-15T14:30:00.000Z",
        effectiveDate: "2024-01-15",
        changedBy: {
          userId: "USR-HR-001",
          userName: "HR Admin",
          userType: "System User",
        },
        approvedBy: {
          userId: "USR-MGR-001",
          userName: "Jane Smith",
          userType: "Manager",
        },
      },
      {
        changeId: "CHG-789013",
        changeType: "Update",
        changeTypeCode: "UPD",
        changeCategory: "Compensation",
        changeCategoryCode: "COMP",
        field: "payRate",
        fieldDisplayName: "Pay Rate",
        oldValue: "95000",
        newValue: "115000",
        changeTimestamp: "2024-01-15T14:30:00.000Z",
        effectiveDate: "2024-01-15",
        changedBy: {
          userId: "USR-HR-001",
          userName: "HR Admin",
          userType: "System User",
        },
        approvedBy: {
          userId: "USR-MGR-001",
          userName: "Jane Smith",
          userType: "Manager",
        },
      },
      {
        changeId: "CHG-789014",
        changeType: "Update",
        changeTypeCode: "UPD",
        changeCategory: "Organization",
        changeCategoryCode: "ORG",
        field: "department",
        fieldDisplayName: "Department",
        oldValue: "Engineering",
        newValue: "Platform Engineering",
        changeTimestamp: "2024-01-10T09:15:00.000Z",
        effectiveDate: "2024-01-10",
        changedBy: {
          userId: "SYSTEM",
          userName: "System",
          userType: "System",
        },
        approvedBy: null,
      },
    ],
    totalChanges: 3,
  },
};

export const getEmployeeChangesByDateExamplePayload = {
  data: [
    {
      firstName: "Marion",
      lastName: "Kent",
      preferredName: "Marion",
      emailAddress: "Marion.Kent@usgmail.net",
      countryCode: "USA",
      languageCode: "en-us",
      employeeNumber: "000000104",
      employeeId: "1HHZIT000080",
      personId: "7edf43b3-9a91-5668-9a80-9463067fcf0b",
      userIntegrationKey: "",
      companyName: "Eastwood(289)",
      companyId: "HDLBX",
      supervisorId: "1HHTJQ000080",
      salaryOrHourly: "S",
      fullTimeOrPartTime: "F",
      isActive: true,
      workLocationCode: "SEAL",
      jobCode: "TECH1",
      projectCode: "Z",
      orgLevel1Code: "SOFT",
      orgLevel2Code: "SUPP",
      orgLevel3Code: "WES",
      orgLevel4Code: "",
      middleName: "M.",
      workPhone: "4155551200",
      homePhone: "4155554987",
      employeeAddress1: "1228 Electric Ave",
      employeeAddress2: "",
      city: "Seal Beach",
      state: "CA",
      zipCode: "90740",
      terminationDate: "",
      hireDate: "1/1/1996 12:00:00 AM",
      supervisorName: "Lyle Smith",
      suffix: "",
      prefix: "MR",
      alternateEmailAddress: "",
      gender: "M",
      employeeStatus: "A",
      employeeType: "REG",
      emplStatusStartDate: "1/1/1997 12:00:00 AM",
      dateInJob: "1/1/1997 12:00:00 AM",
      dateOfLastHire: "1/1/1997 12:00:00 AM",
      jobGroupCode: "",
      alternateJobTitle: "",
    },
  ],
};





export const getPendingHiresExamplePayload = {
  data: {
    pendingHires: [
      {
        pendingHireId: "PH-10001",
        firstName: "Jennifer",
        lastName: "Martinez",
        middleName: "Lynn",
        email: "jennifer.martinez@example.com",
        personalEmail: "j.martinez.personal@email.example.com",
        phone: "555-987-6543",
        mobilePhone: "555-123-7890",
        status: "Pending Review",
        statusCode: "PENDING",
        companyId: "COMP-001",
        companyName: "ACME Corporation",
        expectedStartDate: "2024-03-01",
        jobTitle: "Marketing Manager",
        jobCode: "MKT-MGR",
        jobId: "JOB-MKT-MGR-001",
        departmentId: "DEPT-MKT",
        departmentName: "Marketing",
        departmentCode: "MKT",
        locationId: "LOC-SF-001",
        locationName: "San Francisco Office",
        locationCode: "SF-WEST",
        positionId: "POS-MKT-001",
        positionCode: "MM-SF-001",
        employmentType: "Full-Time",
        employmentTypeCode: "FT",
        payType: "Salary",
        payTypeCode: "SAL",
        payRate: 115000,
        payCurrency: "USD",
        createdDate: "2024-01-25",
        createdBy: "HR System Integration",
        modifiedDate: "2024-01-25",
        modifiedBy: "HR System Integration",
      },
      {
        pendingHireId: "PH-10002",
        firstName: "David",
        lastName: "Chen",
        middleName: null,
        email: "david.chen@example.com",
        personalEmail: "d.chen.work@email.example.com",
        phone: "555-456-7890",
        mobilePhone: "555-789-0123",
        status: "Approved",
        statusCode: "APPROVED",
        companyId: "COMP-001",
        companyName: "ACME Corporation",
        expectedStartDate: "2024-03-15",
        jobTitle: "Software Engineer",
        jobCode: "SW-ENG",
        jobId: "JOB-ENG-SW-001",
        departmentId: "DEPT-ENG",
        departmentName: "Engineering",
        departmentCode: "ENG",
        locationId: "LOC-ATL-001",
        locationName: "Atlanta Headquarters",
        locationCode: "ATL-HQ",
        positionId: "POS-ENG-001",
        positionCode: "SE-ATL-001",
        employmentType: "Full-Time",
        employmentTypeCode: "FT",
        payType: "Salary",
        payTypeCode: "SAL",
        payRate: 95000,
        payCurrency: "USD",
        createdDate: "2024-01-28",
        createdBy: "Recruiting System",
        modifiedDate: "2024-02-01",
        modifiedBy: "HR Admin",
      },
    ],
    totalCount: 2,
    pageNumber: 1,
    pageSize: 100,
  },
};

export const updatePendingHireExamplePayload = {
  data: {
    pendingHireId: "PH-10001",
    firstName: "Jennifer",
    lastName: "Martinez",
    middleName: "Lynn",
    email: "jennifer.martinez@example.com",
    personalEmail: "j.martinez.personal@email.example.com",
    phone: "555-987-6543",
    mobilePhone: "555-123-7890",
    status: "Approved",
    statusCode: "APPROVED",
    companyId: "COMP-001",
    companyName: "ACME Corporation",
    expectedStartDate: "2024-04-01",
    jobTitle: "Senior Marketing Manager",
    jobCode: "MKT-MGR-SR",
    jobId: "JOB-MKT-MGR-SR-001",
    departmentId: "DEPT-MKT",
    departmentName: "Marketing",
    departmentCode: "MKT",
    locationId: "LOC-SF-001",
    locationName: "San Francisco Office",
    locationCode: "SF-WEST",
    positionId: "POS-MKT-001",
    positionCode: "MM-SF-001",
    employmentType: "Full-Time",
    employmentTypeCode: "FT",
    payType: "Salary",
    payTypeCode: "SAL",
    payRate: 125000,
    payCurrency: "USD",
    createdDate: "2024-01-25",
    createdBy: "HR System Integration",
    modifiedDate: "2024-02-10T15:30:00.000Z",
    modifiedBy: "HR Admin",
    message: "Pending hire record updated successfully",
  },
};





export const getNewHireByIdExamplePayload = {
  data: {
    newHireId: "NH-12347",
    tenantIdentifier: "acme-corp",
    firstName: "Robert",
    lastName: "Johnson",
    middleName: "Lee",
    preferredName: "Bob",
    email: "robert.johnson@example.com",
    personalEmail: "bob.j.personal@email.example.com",
    phone: "555-123-4567",
    mobilePhone: "555-987-6543",
    status: "In Progress",
    statusCode: "IN_PROGRESS",
    createdDate: "2024-01-15",
    lastModifiedDate: "2024-02-01",
    expectedStartDate: "2024-02-15",
    actualStartDate: null,
    jobTitle: "Data Analyst",
    jobCode: "DATA-ANLST",
    jobId: "JOB-DATA-001",
    department: "Analytics",
    departmentCode: "ANLYT",
    departmentId: "DEPT-ANLYT",
    location: "Remote",
    locationCode: "REMOTE",
    locationId: "LOC-RMT-001",
    companyId: "COMP-001",
    companyName: "ACME Corporation",
    employmentType: "Full-Time",
    employmentTypeCode: "FT",
    manager: {
      employeeId: "EMP-98765",
      employeeNumber: "E98765",
      firstName: "Sarah",
      lastName: "Davis",
      email: "sarah.davis@acmecorp.example.com",
      title: "Analytics Manager",
    },
    compensation: {
      salary: 85000,
      currency: "USD",
      payFrequency: "Bi-Weekly",
      payFrequencyCode: "BIWEEK",
      bonusEligible: true,
    },
    onboardingProgress: {
      personalInfoComplete: true,
      personalInfoCompletedDate: "2024-01-20",
      taxFormsComplete: true,
      taxFormsCompletedDate: "2024-01-22",
      directDepositComplete: false,
      directDepositCompletedDate: null,
      i9Complete: false,
      i9CompletedDate: null,
      benefitsEnrollmentComplete: false,
      benefitsEnrollmentCompletedDate: null,
      overallPercentComplete: 40,
      totalTasks: 15,
      completedTasks: 6,
      pendingTasks: [
        {
          taskId: "TSK-001",
          taskName: "Direct Deposit Setup",
          taskDescription: "Configure bank account for direct deposit",
          dueDate: "2024-02-10",
          priority: "High",
          category: "Financial",
        },
        {
          taskId: "TSK-002",
          taskName: "I-9 Verification",
          taskDescription: "Complete Form I-9 employment verification",
          dueDate: "2024-02-15",
          priority: "Critical",
          category: "Compliance",
        },
        {
          taskId: "TSK-003",
          taskName: "Benefits Enrollment",
          taskDescription: "Select health, dental, and retirement benefits",
          dueDate: "2024-02-28",
          priority: "High",
          category: "Benefits",
        },
      ],
    },
  },
};

export const createNewHireExamplePayload = {
  data: {
    newHireId: "NH-12349",
    tenantIdentifier: "acme-corp",
    firstName: "Michael",
    lastName: "Brown",
    middleName: "James",
    email: "michael.brown@example.com",
    personalEmail: "m.brown.work@email.example.com",
    status: "In Progress",
    statusCode: "IN_PROGRESS",
    createdDate: "2024-01-20",
    expectedStartDate: "2024-03-01",
    jobTitle: "Software Engineer",
    jobCode: "SW-ENG",
    department: "Engineering",
    departmentCode: "ENG",
    location: "Atlanta Headquarters",
    locationCode: "ATL-HQ",
    companyId: "COMP-001",
    companyName: "ACME Corporation",
    message: "New hire record created successfully. Onboarding process initiated.",
    onboardingLink: "https://onboarding.ukg.com/portal/newhire/NH-12349",
  },
};

export const getInProgressNewHiresExamplePayload = {
  data: [
    {
      contactInformation: {
        name: {
          prefix: {
            id: "d9079570-57f0-4530-b889-a07c95acb846",
            name: {
              enUS: "Mr.",
            },
          },
          first: "Hugo",
          middle: "Alexander",
          last: "Mastrantonioni",
          formerLast: "Johnson",
          suffix: {
            id: "99ace441-e900-4a4c-9731-c97ea8451482",
            name: {
              enUS: "III",
            },
          },
          preferredFirst: "Hugh",
        },
        emailAddress: "hugo2296@gmail.com",
        primaryPhone: "3056985433",
        secondaryPhone: "3056986533",
        address: {
          line1: "123 Main St",
          line2: "APT. 101",
          city: "Toronto",
          postalCode: "M1R0E9",
          county: "County of Canada",
          stateCode: "ON",
          countryCode: "CAN",
          country: {
            code: "CAN",
            name: {
              enUS: "Canada",
            },
          },
        },
      },
      job: {
        id: "96a5833e-5f4b-46b0-ac58-41dba1e4aa1b",
        code: "DJOB",
        name: {
          enUS: "Lead Tech",
          esES: "Tecnico Principal",
        },
        requisitionId: "DEV30335",
        selectedFLSAStatus: 2,
        supervisor: {
          id: "28e2f53b-2366-4aef-98f0-f8b765bb9f7a",
          name: {
            prefix: {
              id: "d9079570-57f0-4530-b889-a07c95acb846",
              name: {
                enUS: "Mr.",
              },
            },
            first: "Joe",
            middle: "Jose",
            last: "Santo",
            suffix: {
              id: "99ace441-e900-4a4c-9731-c97ea8451482",
              name: {
                enUS: "Jr",
              },
            },
            preferredFirst: "Joseph",
          },
          email: "jsanto@example.com",
          externalUserId: "BF5DAEBD-9149-40BB-9AB3-C4755F98F4D0",
        },
        componentCompany: {
          id: "f7bbaf0c-d703-4b46-8ef2-8ea62e9319c4",
          name: "Wayne Enterprises",
        },
        workLocation: {
          id: "b3ee9042-43be-4a9d-aa03-1ef2d41153f9",
          name: "Toronto Headquarters",
        },
        employeeType: {
          id: "8ccb43fd-686b-4cbb-abb3-ced359148ae1",
          name: {
            enUS: "Comp Mgt 1-Reg",
          },
        },
      },
      compensation: {
        isFullTime: true,
        isSalaried: true,
        workHours: 40,
        weeklyHours: 168,
        currencyType: "CAD",
        currency: {
          code: "CAD",
          name: {
            enUS: "Canadian Dollar",
          },
        },
        payRate: 50000,
        ratePer: {
          code: "Y",
          name: {
            enUS: "Year",
          },
        },
      },
      mentor: {
        id: "56f378ee-90d4-44ec-9ab7-83f2437d1fe6",
        name: {
          prefix: {
            id: "d9079570-57f0-4530-b889-a07c95acb846",
            name: {
              enUS: "Mr.",
            },
          },
          first: "Oden",
          middle: "Joe",
          last: "Leonerd",
          suffix: {
            id: "99ace441-e900-4a4c-9731-c97ea8451482",
            name: {
              enUS: "III",
            },
          },
          preferredFirst: "Kevin",
        },
        email: "oden_leon@gmail.com",
        description:
          "Oden will be your mentor and is THE person to get you up to speed on the product. She loves helping new team members.",
        externalUserId: "145A494C-DAFD-4454-881C-6700C85512C8",
      },
      onboardingOwner: {
        id: "2d42c7a5-52de-402e-92af-493b5b7f0682",
        name: {
          prefix: {
            id: "d9079570-57f0-4530-b889-a07c95acb846",
            name: {
              enUS: "Mr.",
            },
          },
          first: "Jared",
          middle: "Joseph",
          last: "Nalin",
          suffix: {
            id: "99ace441-e900-4a4c-9731-c97ea8451482",
            name: {
              enUS: "III",
            },
          },
          preferredFirst: "Jared",
        },
        email: "jared_nalin@example.com",
        externalUserId: "74A3D0C8-FF2A-4EC9-9263-F515B000A0C5",
      },
      onboardingStatus: "Launched",
      referenceId: "JUNE7632",
      sentToProcessHireDate: null,
      launchedOn: {
        utcInstant: "2018-06-07T17:44:25.358Z",
        offset: "-04:00:00",
      },
      hireDate: "2018-06-06T00:00:00Z",
      orientationDate: "2018-07-06T00:00:00Z",
      startDate: "2018-06-30T00:00:00Z",
      organizationLevels: [
        {
          id: "b7a43db9-73c7-43d6-aaab-7b2bc20ed50f",
          level: 1,
          code: "PROD",
          description: "Product division",
        },
        {
          id: "8e4507db-330b-466d-8786-9f55da5f6c31",
          level: 2,
          code: "PR",
          description: "Public relations",
        },
        {
          id: "2bf4a848-2926-485f-aa47-4aa8db90921b",
          level: 3,
          code: "STAT",
          description: "Stanton branch",
        },
        {
          id: "3c792567-7494-4f84-91ae-73c797c714ef",
          level: 4,
          code: "SALES",
          description: "Sales team",
        },
      ],
      provisioning: {
        provisioningItems: [
          {
            id: "9977e393-3e7a-4044-a8f9-d8c3f6ef0de2",
            name: "Corporate Credit Card",
            recipient: "accounting@company.com",
            selectedOption: {
              id: "a4971b36-e8a3-43c8-b163-27c6d9dfbb98",
              description: "Amax Card",
            },
            comments: "Requires a platinum Amax Card",
          },
          {
            id: "1f9c7b77-18b3-4ab7-b9cb-03790c0dc4bd",
            name: "Network Account",
            recipient: "helpdesk@company.com",
            selectedOption: {
              id: "3c792567-7494-4f84-91ae-73c797c714ef",
              description: "Super Account",
            },
            comments: "Highest clearance",
          },
          {
            id: "add33aee-ebff-4d50-8f45-9d7ab820c053",
            name: "Phone Type",
            recipient: "helpdesk@company.com",
            selectedOption: {
              id: "05882bc4-7ae6-40b5-b1ee-2e56dd37bb49",
              description: "Galaxy S5",
            },
            comments: "Requires a black phone",
          },
        ],
        summaryEmailRecipients: ["first@last.com", "last@beuh.com", "Joe@erad.com"],
      },
      identityUserId: "05882bc4-7ae6-40b5-b1ee-2e56dd37bb49",
      externalUserId: "b7a4fd34-73c7-43d6-aaab-7b2bc20ed50f",
      employeeNumber: "1234567890",
      ukgProStatus: "Not in Core",
      personalMessage:
        "Hugo, I was very impressed with your passion. I am looking forward to working with you and I know your expertise in this space will help our team get to the next level.",
      pastStartDateReason: "An internal audit revealed that the new hire was not initiated",
      id: "05882bc4-7ae6-40b5-b1ee-2e56dd37bb49",
      createdAt: "2018-05-29T19:30:35.95Z",
      updatedAt: "2018-06-07T17:44:25.378Z",
    } as InProgressNewHire,
  ],
};

export const getCompletedNewHiresExamplePayload = {
  data: [
    {
      contactInformation: {
        name: {
          prefix: {
            id: "90497c4a-9d93-4176-8689-058c5b4bd595",
            name: {
              enUS: "Dr.",
            },
          },
          first: "Glenn",
          middle: "",
          last: "Murphy",
          formerLast: null,
          suffix: null,
          preferredFirst: null,
        },
        emailAddress: "glenn@example.com",
        primaryPhone: "9542542525",
        secondaryPhone: "7149834446",
        address: {
          line1: "78 Fake St.",
          line2: null,
          city: "Westwood",
          postalCode: "23456",
          county: null,
          stateCode: "AZ",
          countryCode: "USA",
          country: {
            code: "USA",
            name: {
              enUS: "United States",
              nlNL: "VS",
              frCA: "États-Unis",
              frFR: "É.-U.",
              deDE: "U.S.A",
              itIT: "U.S.A",
              msMY: "Amerika Syarikat",
              phPH: "U.S.A",
              ptBR: "EUA",
              esES: "Estados Unidos",
            },
          },
        },
      },
      job: {
        id: "e23b3cfa-b464-4560-96ab-4932028555db",
        code: "MGT",
        name: {
          enUS: "Assistant to the District Manager",
          esES: "Asistente del Gerente de Distrito",
        },
        requisitionId: "MGT04104",
        selectedFLSAStatus: 1,
        supervisor: {
          id: "31f3926d-7f70-4d59-9cde-884a37b28015",
          name: {
            prefix: null,
            first: "Jeff",
            middle: null,
            last: "Winner",
            formerLast: null,
            suffix: null,
            preferredFirst: null,
          },
          email: null,
          externalUserId: null,
        },
        componentCompany: {
          id: "090e19d9-8e48-4a06-bcdb-142415bd754e",
          name: "Acme Industries",
        },
        workLocation: {
          id: "47a6f7c8-5ca4-41f2-b69f-c155c5356dd0",
          name: "Southwest Headquarters",
        },
        employeeType: {
          id: "254e08b1-0194-4451-b847-e597747024db",
          name: {
            enUS: "Salaried Full-Time",
          },
        },
      },
      compensation: {
        isFullTime: true,
        isSalaried: true,
        workHours: 40,
        weeklyHours: null,
        currencyType: "USD",
        currency: {
          code: "USD",
          name: {
            enUS: "US Dollar",
          },
        },
        payRate: 50000,
        ratePer: {
          code: "Y",
          name: {
            enUS: "Year",
          },
        },
      },
      mentor: {
        id: "6b9521e9-9c61-4955-b3a0-0d20f9002745",
        name: {
          prefix: null,
          first: "Suzie",
          middle: null,
          last: "Wagner",
          formerLast: null,
          suffix: null,
          preferredFirst: null,
        },
        email: "suzie@example.com",
        description:
          "Suzie is THE person who knows the product best. She loves helping new team members.",
        externalUserId: "4AC7F8A4-87CE-4C26-9B60-C6A8B818AC89",
      },
      onboardingOwner: {
        id: "57e8efd5-c62f-4473-b6d2-f8c138a25d9f",
        name: {
          prefix: null,
          first: "Janice",
          middle: "Isabel",
          last: "Gonzales",
          formerLast: null,
          suffix: null,
          preferredFirst: "Janice",
        },
        email: "janice87@example.com",
        externalUserId: "0A062742-844A-4590-BB7F-B13F59DA4523",
      },
      organizationLevels: null,
      provisioning: null,
      sentToProcessHireDate: {
        utcInstant: "2024-08-06T18:12:56.159Z",
        offset: "-04:00:00",
      },
      launchedOn: {
        utcInstant: "2024-08-05T20:45:49.646Z",
        offset: "-04:00:00",
      },
      hireDate: "2024-08-01T00:00:00Z",
      orientationDate: "2024-10-12T00:00:00Z",
      startDate: "2024-10-08T00:00:00Z",
      identityUserId: "3817774a-0340-46f5-9a72-4c416132a32b",
      externalUserId: "21986bc7-0d40-4f55-8da1-1871640cb802",
      onboardingStatus: "Completed",
      referenceId: null,
      personalMessage:
        "We are delighted that you have joined our organization and look forward to working with you.",
      pastStartDateReason: null,
      employeeNumber: null,
      ukgProStatus: "Hired in Core",
      id: "3817774a-0340-46f5-9a72-4c416132a32b",
      createdAt: "2024-07-13T20:46:01.661Z",
      updatedAt: "2024-08-06T18:12:56.159Z",
    } as CompletedNewHire,
  ],
};

export const getCanceledNewHiresExamplePayload = {
  data: [
    {
      contactInformation: {
        name: {
          prefix: {
            id: "90497c4a-9d93-4176-8689-058c5b4bd595",
            name: {
              enUS: "Dr.",
            },
          },
          first: "Fred",
          middle: null,
          last: "Martin",
          formerLast: null,
          suffix: null,
          preferredFirst: null,
        },
        emailAddress: "fredmartin237@example.com",
        primaryPhone: "7182345678",
        secondaryPhone: "7182386548",
        address: {
          line1: "456 Fun St.",
          line2: null,
          city: "Springfield",
          postalCode: "33162",
          county: null,
          stateCode: "NY",
          countryCode: "USA",
          country: {
            code: "USA",
            name: {
              enUS: "United States",
              nlNL: "VS",
              frCA: "États-Unis",
              frFR: "É.-U.",
              deDE: "U.S.A",
              itIT: "U.S.A",
              msMY: "Amerika Syarikat",
              phPH: "U.S.A",
              ptBR: "EUA",
              esES: "Estados Unidos",
            },
          },
        },
      },
      job: {
        id: "5edfb84e-8e1d-48c5-8111-86d926d9257b",
        code: "VP-001",
        name: {
          enUS: "Vice President",
          esES: "Vice Presidente",
        },
        requisitionId: "ADM4404",
        selectedFLSAStatus: 0,
        supervisor: null,
        componentCompany: {
          id: "090e19d9-8e48-4a06-bcdb-142415bd754e",
          name: "Acme Industries",
        },
        workLocation: {
          id: "a22c1329-8467-4248-bcf1-c99d8d023524",
          name: "New York Office",
        },
        employeeType: null,
      },
      compensation: {
        isFullTime: true,
        isSalaried: true,
        workHours: 40,
        weeklyHours: null,
        currencyType: "USD",
        currency: {
          code: "USD",
          name: {
            enUS: "US Dollar",
          },
        },
        payRate: 50000,
        ratePer: {
          code: "Y",
          name: {
            enUS: "Year",
          },
        },
      },
      mentor: {
        id: "6b9521e9-9c61-4955-b3a0-0d20f9002745",
        name: {
          prefix: null,
          first: "Suzie",
          middle: null,
          last: "Wagner",
          formerLast: null,
          suffix: null,
          preferredFirst: null,
        },
        email: "suzie@example.com",
        description:
          "Suzie is THE person who knows the product best. She loves helping new team members.",
        externalUserId: null,
      },
      onboardingOwner: {
        id: "6be4f286-7266-4b9a-ac09-07a2b028d810",
        name: {
          prefix: null,
          first: "Joanna",
          middle: null,
          last: "Thompson",
          formerLast: null,
          suffix: null,
          preferredFirst: null,
        },
        email: "joanna@example.org",
        externalUserId: "5237CF4C-D8D0-4A0C-AA23-D7D3F2572634",
      },
      organizationLevels: null,
      provisioning: null,
      sentToProcessHireDate: null,
      launchedOn: null,
      hireDate: "2023-10-29T00:00:00Z",
      orientationDate: null,
      startDate: "2024-11-30T00:00:00Z",
      identityUserId: "2ea55ff1-0ad0-4bca-a4d7-56ff2123d500",
      externalUserId: null,
      onboardingStatus: "Canceled",
      referenceId: null,
      personalMessage:
        "We are delighted that you have joined our organization and look forward to working with you.",
      pastStartDateReason: null,
      employeeNumber: null,
      ukgProStatus: "Not in Core",
      id: "fcfcc28f-bee9-4ec8-8060-2ae28104982f",
      createdAt: "2023-05-13T20:46:01.66Z",
      updatedAt: "2023-05-27T17:08:31.484Z",
    } as CanceledNewHire,
  ],
};

export const deleteNewHireExamplePayload = {
  data: {
    success: true,
    message: "New hire NH-12345 has been deleted successfully",
    deletedNewHireId: "NH-12345",
    deletedDate: "2024-02-15T10:30:00.000Z",
  },
};





export const importXmlDataExamplePayload = {
  data: {
    stagingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    dateTimeCreated: "2024-02-15T14:30:00.000Z",
    fileName: "newhire-batch-2024-02-15.xml",
    message: "XML transaction submitted successfully. Use stagingId to check status.",
  },
};

export const getImportStatusExamplePayload = {
  data: {
    stagingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    status: "Processing",
    statusCode: "PROCESSING",
    dateTimeCreated: "2024-02-15T14:30:00.000Z",
    dateTimeStarted: "2024-02-15T14:30:05.000Z",
    dateTimeCompleted: null,
    fileName: "newhire-batch-2024-02-15.xml",
    totalRecords: 10,
    processedRecords: 4,
    successfulRecords: 4,
    failedRecords: 0,
    percentComplete: 40,
  },
};

export const getTransactionStatusExamplePayload = {
  data: {
    stagingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    transactionName: "New Hire/Re-Hire",
    transactionType: "NEWHIRE",
    status: "Completed",
    statusCode: "COMPLETED",
    dateTimeCreated: "2024-02-15T14:30:00.000Z",
    dateTimeCompleted: "2024-02-15T14:35:00.000Z",
    fileName: "newhire-batch-2024-02-15.xml",
  },
};

export const getFileStatusExamplePayload = {
  data: {
    stagingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    fileName: "newhire-batch-2024-02-15.xml",
    fileStatus: "Processed",
    fileStatusCode: "PROCESSED",
    dateTimeUploaded: "2024-02-15T14:30:00.000Z",
    dateTimeProcessed: "2024-02-15T14:35:00.000Z",
    fileSizeBytes: 4096,
    transactionCount: 10,
    validationStatus: "Valid",
    validationStatusCode: "VALID",
    validationErrors: [],
  },
};

export const getFileSummaryExamplePayload = {
  data: {
    stagingId: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    fileName: "newhire-batch-2024-02-15.xml",
    transactionType: "New Hire/Re-Hire",
    transactionTypeCode: "NEWHIRE",
    dateTimeCreated: "2024-02-15T14:30:00.000Z",
    dateTimeCompleted: "2024-02-15T14:35:00.000Z",
    status: "Completed",
    statusCode: "COMPLETED",
    summary: {
      totalRecords: 10,
      successfulRecords: 9,
      failedRecords: 1,
      warningRecords: 0,
    },
    results: [
      {
        recordNumber: 1,
        employeeNumber: "E12350",
        employeeName: "John Smith",
        status: "Success",
        statusCode: "SUCCESS",
        message: "Employee record created successfully",
      },
      {
        recordNumber: 2,
        employeeNumber: null,
        employeeName: "Jane Doe",
        status: "Failed",
        statusCode: "FAILED",
        message: "Required field 'SSN' is missing",
        errorCode: "MISSING_REQUIRED_FIELD",
      },
    ],
  },
};





export const selectCompanyExamplePayload = {
  result: [
    { label: "ACME Corporation (ACME001)", key: "ACME001" },
    { label: "TechCorp Industries (TECH002)", key: "TECH002" },
    { label: "Global Services LLC (GLOB003)", key: "GLOB003" },
  ],
};

export const selectJobExamplePayload = {
  result: [
    { label: "Software Developer (SW-DEV)", key: "JOB-DEV-001" },
    { label: "Marketing Manager (MKT-MGR)", key: "JOB-MKT-001" },
    { label: "Sales Representative (SALES-REP)", key: "JOB-SALES-001" },
    { label: "HR Specialist (HR-SPEC)", key: "JOB-HR-001" },
  ],
};

export const selectLocationExamplePayload = {
  result: [
    { label: "San Francisco Headquarters (SF-HQ)", key: "LOC-SF" },
    { label: "New York Office (NYC-OFFICE)", key: "LOC-NYC" },
    { label: "Remote (REMOTE)", key: "LOC-REMOTE" },
    { label: "Chicago Branch (CHI-BRANCH)", key: "LOC-CHI" },
  ],
};

export const selectPositionExamplePayload = {
  result: [
    { label: "Software Engineer (SW-ENG-001)", key: "POS-001" },
    { label: "Marketing Manager (MKT-MGR-001)", key: "POS-002" },
    { label: "Sales Lead (SALES-LEAD-001)", key: "POS-003" },
    { label: "HR Coordinator (HR-COORD-001)", key: "POS-004" },
  ],
};
