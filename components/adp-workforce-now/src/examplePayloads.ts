export const getApplicantOnboardMetadataResponse = {
  meta: {
    "/applicantOnboarding/applicantPayrollProfile/payrollGroupCode": {
      codeList: {
        codeListTitle: "Company Code",
        links: [
          {
            href: "/codelists/payroll/v4/payroll-instruction-management/pay-groups/wfn/1?$filter=category eq 'US'",
            rel: "/adp/codelist",
            mediaType: "application/json",
            method: "GET",
          },
        ],
      },
      readOnly: false,
      optional: false,
      hidden: false,
      sequence: 5,
      shortLabelName: "Company Code",
    },
    "/applicantOnboarding/applicantPersonalProfile/birthName/givenName": {
      readOnly: false,
      optional: false,
      hidden: false,
      sequence: 10,
      shortLabelName: "First Name",
    },
    "/applicantOnboarding/applicantPersonalProfile/birthName/familyName": {
      readOnly: false,
      optional: false,
      hidden: false,
      sequence: 12,
      shortLabelName: "Last Name",
    },
    "/applicantOnboarding/onboardingTemplateCode": {
      codeList: {
        listItems: [
          {
            itemID: "169748818049_1",
            code: "169748818049_1",
            name: "Applicant Onboard",
          },
          {
            itemID: "169748461979_1115",
            code: "169748461979_1115",
            name: "Applicant1",
          },
          {
            itemID: "14495_6403",
            code: "14495_6403",
            name: "HR + Payroll (System)",
          },
          {
            itemID: "14495_6600",
            code: "14495_6600",
            name: "HR + Payroll + Time (System)",
          },
          {
            itemID: "15336_7437",
            code: "15336_7437",
            name: "HR + Time (System)",
          },
          {
            itemID: "15336_7354",
            code: "15336_7354",
            name: "HR Only (System)",
          },
          {
            itemID: "169748461979_956",
            code: "169748461979_956",
            name: "HRpayroll_hire",
          },
          {
            itemID: "169740782707_211",
            code: "169740782707_211",
            name: "Oct-Onboard",
          },
          {
            itemID: "169747337569_15",
            code: "169747337569_15",
            name: "Test_Demo",
          },
          {
            itemID: "169745969973_796",
            code: "169745969973_796",
            name: "TotalSource Time",
          },
        ],
      },
      readOnly: false,
      optional: false,
      hidden: false,
    },
    "/applicantOnboarding/applicantWorkerProfile/hireDate": {
      readOnly: false,
      optional: false,
      hidden: false,
      sequence: 1,
      shortLabelName: "Hire Date",
      minLength: 0,
      maxLength: 10,
      pattern:
        "^(((19|20|21)\\d\\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\\d|3[01]))?$",
    },
  },
};

export const getWorkerResponse = {
  associateOID: "G3R47DSRZK5TRCFJ",
  workerID: {
    idValue: "3WC5KYA4L",
  },
  person: {
    birthDate: "0000-01-01",
    genderCode: {
      codeValue: "M",
      shortName: "Male",
      longName: "Male",
    },
    maritalStatusCode: {
      codeValue: "S",
      shortName: "Single",
    },
    socialInsurancePrograms: [
      {
        nameCode: {
          codeValue: "Medicare",
          shortName: "Medicare",
        },
        coveredIndicator: true,
      },
    ],
    tobaccoUserIndicator: false,
    disabledIndicator: false,
    ethnicityCode: {
      codeValue: "4",
      shortName: "4",
      longName: "Not Hispanic or Latino",
    },
    raceCode: {
      codeValue: "1",
      shortName: "White",
      longName: "White",
    },
    customFieldGroup: {
      amountFields: [
        {
          itemID: "169731481494_452",
          nameCode: {
            codeValue: "Rate",
            shortName: "Rate",
          },
        },
      ],
      stringFields: [
        {
          itemID: "169731474432_105",
          nameCode: {
            codeValue: "PR code",
            shortName: "PR code",
          },
        },
      ],
    },
    governmentIDs: [
      {
        itemID: "67786684N",
        idValue: "XXX-XX-3761",
        nameCode: {
          codeValue: "SSN",
          longName: "Social Security Number",
        },
        countryCode: "US",
      },
    ],
    legalName: {
      givenName: "test761",
      middleName: "two",
      familyName1: "NewHire",
      formattedName: "NewHire, test761 two",
    },
    legalAddress: {
      nameCode: {
        codeValue: "Personal Address 1",
        shortName: "Personal Address 1",
      },
      lineOne: "line 1",
      lineTwo: "line 2",
      lineThree: "Address line 3",
      cityName: "New Jersey",
      countrySubdivisionLevel1: {
        subdivisionType: "StateTerritory",
        codeValue: "NJ",
        shortName: "New Jersey",
      },
      countryCode: "US",
      postalCode: "30041",
    },
    communication: {
      landlines: [
        {
          itemID: "CC1_169733208370_10",
          nameCode: {
            codeValue: "Home Phone",
            shortName: "Home Phone",
          },
          countryDialing: "1",
          areaDialing: "973",
          dialNumber: "2345432",
          access: "1",
          formattedNumber: "(973) 234-5432",
        },
      ],
      mobiles: [
        {
          itemID: "CC1_169733208370_9",
          nameCode: {
            codeValue: "Personal Cell",
            shortName: "Personal Cell",
          },
          countryDialing: "1",
          areaDialing: "770",
          dialNumber: "2398790",
          access: "1",
          formattedNumber: "(770) 239-8790",
        },
      ],
      faxes: [
        {
          itemID: "CC1_169733208370_11",
          nameCode: {
            codeValue: "Home Fax",
            shortName: "Home Fax",
          },
          countryDialing: "91",
          areaDialing: "770",
          dialNumber: "2345432890890790",
          access: "429",
          formattedNumber: "+91 (429) 770 2345432890890790",
        },
      ],
      emails: [
        {
          nameCode: {
            codeValue: "Personal E-mail",
            shortName: "Personal E-mail",
          },
          emailUri: "test761@newhirepersonal.com",
        },
      ],
    },
  },
  workerDates: {
    originalHireDate: "2019-07-12",
  },
  workerStatus: {
    statusCode: {
      codeValue: "Active",
    },
  },
  businessCommunication: {
    landlines: [
      {
        itemID: "CC1_169733208370_14",
        nameCode: {
          codeValue: "Work Phone",
          shortName: "Work Phone",
        },
        countryDialing: "91",
        areaDialing: "770",
        dialNumber: "2345432890890793",
        access: "429",
        formattedNumber: "+91 (429) 770 2345432890890793",
      },
    ],
    mobiles: [
      {
        itemID: "CC1_169733208370_13",
        nameCode: {
          codeValue: "Work Cell",
          shortName: "Work Cell",
        },
        countryDialing: "91",
        areaDialing: "770",
        dialNumber: "2345432890890794",
        access: "429",
        formattedNumber: "+91 (429) 770 2345432890890794",
      },
    ],
    faxes: [
      {
        itemID: "CC1_169733208370_15",
        nameCode: {
          codeValue: "Work Fax",
          shortName: "Work Fax",
        },
        countryDialing: "91",
        areaDialing: "770",
        dialNumber: "2345432890890795",
        access: "429",
        formattedNumber: "+91 (429) 770 2345432890890795",
      },
    ],
    pagers: [
      {
        itemID: "CC1_169733208370_16",
        nameCode: {
          codeValue: "Work Pager",
          shortName: "Work Pager",
        },
        countryDialing: "91",
        areaDialing: "770",
        dialNumber: "2345432890890796",
        access: "429",
        formattedNumber: "+91 (429) 770 2345432890890796",
      },
    ],
    emails: [
      {
        itemID: "Business",
        nameCode: {
          codeValue: "Work E-mail",
          shortName: "Work E-mail",
        },
        emailUri: "test761@lnewhireprofessional.com",
      },
    ],
  },
  workAssignments: [
    {
      itemID: "67786684N",
      primaryIndicator: true,
      hireDate: "2019-07-12",
      actualStartDate: "2019-07-12",
      assignmentStatus: {
        statusCode: {
          codeValue: "A",
          shortName: "Active",
        },
      },
      jobCode: {
        codeValue: "PT",
        shortName: "**",
      },
      jobTitle: "PT - **",
      positionID: "94N023114",
      homeOrganizationalUnits: [
        {
          nameCode: {
            codeValue: "B",
            shortName: "test",
          },
          typeCode: {
            codeValue: "Business Unit",
            shortName: "Business Unit",
          },
        },
      ],
      assignedOrganizationalUnits: [
        {
          nameCode: {
            codeValue: "B",
            shortName: "test",
          },
          typeCode: {
            codeValue: "Business Unit",
            shortName: "Business Unit",
          },
        },
      ],
      payCycleCode: {
        codeValue: "W",
        shortName: "Weekly",
      },
      standardPayPeriodHours: {
        hoursQuantity: 40,
      },
      baseRemuneration: {
        payPeriodRateAmount: {
          nameCode: {
            codeValue: "Salary",
            shortName: "Salary",
          },
          amountValue: 12332,
          currencyCode: "USD",
        },
        effectiveDate: "2019-07-12",
      },
      payrollGroupCode: "94N",
      payrollScheduleGroupID: "Use Period End Date 1 on checks",
      payrollFileNumber: "023114",
      managementPositionIndicator: false,
    },
  ],
};

export const listWorkersResponse = {
  workers: [getWorkerResponse],
  meta: null,
  confirmMessage: null,
};

export const listWorkersMetadataResponse = {
  meta: {
    queryCriteria: [
      {
        itemID: "q1",
        queryOptionCode: "$select",
        queryOptionTypeCode: "OData",
        resourcePaths: [
          "workers/associateOID",
          "workers/businessCommunication",
        ],
      },
    ],
    "/workers/associateOID": {
      readOnly: true,
      optional: false,
      hidden: true,
    },
    "/workers/workerID": {
      readOnly: true,
      optional: false,
    },
    "/workers/workerID/idValue": {
      readOnly: true,
      optional: false,
      hidden: false,
    },
  },
};

export const getWorkerDemographicsResponse = {
  associateOID: "G39XMN203A2XB23T",
  workerID: {
    idValue: "Z76ORSBVW",
  },
  person: {
    genderCode: {
      codeValue: "M",
      shortName: "Male",
      longName: "Male",
    },
    tobaccoUserIndicator: true,
    disabledIndicator: false,
    preferredName: {},
    militaryClassificationCodes: [],
    customFieldGroup: {
      codeFields: [
        {
          itemID: "13916651_182",
          nameCode: {
            codeValue: "T-Shirt Size",
            shortName: "T-Shirt Size",
          },
          codeValue: "M - Medium",
          shortName: "M - Medium",
        },
        {
          itemID: "1500091404_30",
          nameCode: {
            codeValue: "Uniform Size",
            shortName: "Uniform Size",
          },
        },
      ],
      indicatorFields: [
        {
          itemID: "9201050494831_1",
          nameCode: {
            codeValue: "Greenhouse User",
            shortName: "Greenhouse User",
          },
        },
        {
          itemID: "9201036437608_1",
          nameCode: {
            codeValue: "Greenhouse Recruiting",
            longName: "Greenhouse Recruiting",
          },
        },
      ],
      numberFields: [
        {
          itemID: "13916651_189",
          nameCode: {
            codeValue: "Shoe Size",
            shortName: "Shoe Size",
          },
        },
      ],
      percentFields: [
        {
          itemID: "9201127985969_1",
          nameCode: {
            codeValue: "Bonus",
            shortName: "Bonus",
          },
        },
      ],
      stringFields: [
        {
          itemID: "9200337152612_1",
          nameCode: {
            codeValue: "Performance Review 1",
            shortName: "Performance Review 1",
          },
        },
      ],
    },
    legalName: {
      givenName: "AnnADP",
      familyName1: "A",
      formattedName: "A, AnnADP",
    },
    legalAddress: {
      nameCode: {
        codeValue: "Personal Address 1",
        shortName: "Personal Address 1",
        longName: "Personal Address 1",
      },
      lineOne: "ufdas",
      lineTwo: "ds",
      cityName: "hjgkjhdwkljldkj",
      countrySubdivisionLevel1: {
        subdivisionType: "StateTerritory",
        codeValue: "CA",
        shortName: "California",
      },
      countryCode: "US",
      postalCode: "45678",
    },
    communication: {
      landlines: [
        {
          itemID: "9200067602177_1",
          nameCode: {
            codeValue: "Home Phone",
            shortName: "Home Phone",
          },
          countryDialing: "1",
          areaDialing: "236",
          dialNumber: "8821788",
          access: "1",
          formattedNumber: "(236) 882-1788",
        },
      ],
      mobiles: [
        {
          itemID: "9200067596746_1",
          nameCode: {
            codeValue: "Personal Cell",
            shortName: "Personal Cell",
          },
          countryDialing: "1",
          areaDialing: "236",
          dialNumber: "8821786",
          access: "1",
          formattedNumber: "(236) 882-1786",
        },
      ],
      faxes: [
        {
          itemID: "9200067602178_1",
          nameCode: {
            codeValue: "Home Fax",
            shortName: "Home Fax",
          },
          countryDialing: "1",
          areaDialing: "236",
          dialNumber: "8821788",
          access: "1",
          formattedNumber: "(236) 882-1788",
        },
      ],
      pagers: [
        {
          itemID: "9200067602179_1",
          nameCode: {
            codeValue: "Personal Pager",
            shortName: "Personal Pager",
          },
          countryDialing: "1",
          areaDialing: "236",
          dialNumber: "8821788",
          access: "1",
          formattedNumber: "(236) 882-1788",
        },
      ],
      emails: [
        {
          nameCode: {
            codeValue: "Personal E-mail",
            shortName: "Personal E-mail",
          },
          emailUri: "derricksdk@workato.com",
          notificationIndicator: true,
        },
      ],
    },
  },
  workerDates: {
    originalHireDate: "2018-06-12",
  },
  workerStatus: {
    statusCode: {
      codeValue: "Inactive",
    },
  },
  businessCommunication: {
    landlines: [
      {
        itemID: "2613129058_1",
        nameCode: {
          codeValue: "Work Phone",
          shortName: "Work Phone",
        },
        countryDialing: "1",
        areaDialing: "236",
        dialNumber: "8821788",
        access: "1",
        formattedNumber: "(236) 882-1788",
      },
    ],
    mobiles: [
      {
        itemID: "9200067602180_1",
        nameCode: {
          codeValue: "Work Cell",
          shortName: "Work Cell",
        },
        countryDialing: "1",
        areaDialing: "236",
        dialNumber: "8821788",
        access: "1",
        formattedNumber: "(236) 882-1788",
      },
    ],
    faxes: [
      {
        itemID: "9200067602181_1",
        nameCode: {
          codeValue: "Work Fax",
          shortName: "Work Fax",
        },
        countryDialing: "1",
        areaDialing: "236",
        dialNumber: "8821788",
        access: "1",
        formattedNumber: "(236) 882-1788",
      },
    ],
    pagers: [
      {
        itemID: "9200067602182_1",
        nameCode: {
          codeValue: "Work Pager",
          shortName: "Work Pager",
        },
        countryDialing: "1",
        areaDialing: "236",
        dialNumber: "8821788",
        access: "1",
        formattedNumber: "(236) 882-1788",
      },
    ],
    emails: [
      {
        itemID: "Business",
        nameCode: {
          codeValue: "Work E-mail",
          shortName: "Work E-mail",
        },
        emailUri: "example@example.com",
        notificationIndicator: false,
      },
    ],
  },

  workAssignments: [
    {
      itemID: "88029255N",
      primaryIndicator: true,
      hireDate: "2022-01-15",
      actualStartDate: "2022-01-15",
      terminationDate: "2022-12-01",
      assignmentStatus: {
        statusCode: {
          codeValue: "T",
          shortName: "Terminated",
          longName: "Terminated",
        },
        reasonCode: {
          codeValue: "B",
          shortName: "Acquisition Merger",
        },
        effectiveDate: "2022-12-01",
      },
      positionID: "4Y3987491",
      assignedWorkLocations: [
        {
          address: {
            nameCode: {
              codeValue: "Business Address",
              shortName: "Work Address",
              longName: "Work Address",
            },
            lineOne: "9628 Ainslie downs st",
            cityName: "Charlotte",
            countrySubdivisionLevel1: {
              subdivisionType: "StateTerritory",
              codeValue: "NC",
              shortName: "North Carolina",
            },
            countryCode: "US",
            postalCode: "28273",
          },
        },
      ],
      payCycleCode: {
        codeValue: "B",
        shortName: "Biweekly",
      },
      standardPayPeriodHours: {
        hoursQuantity: 80,
      },
      payrollProcessingStatusCode: {
        shortName: "Paid",
      },
      payrollGroupCode: "4Y3",
      payrollFileNumber: "987491",
      customFieldGroup: {},
      customCountryInputs: [],
    },
  ],
  customFieldGroup: {
    amountFields: [
      {
        itemID: "13916651_176",
        nameCode: {
          codeValue: "Travel Allowance",
          shortName: "Travel Allowance",
        },
      },
      {
        itemID: "13916651_172",
        nameCode: {
          codeValue: "Housing Allowance",
          shortName: "Housing Allowance",
        },
      },
      {
        itemID: "13916651_180",
        nameCode: {
          codeValue: "Education Allowance",
          shortName: "Education Allowance",
        },
      },
    ],
    indicatorFields: [
      {
        itemID: "13916651_170",
        nameCode: {
          codeValue: "German Lab Clearance",
          shortName: "German Lab Clearance",
        },
      },
      {
        itemID: "9201036437651_1",
        nameCode: {
          codeValue: "Greenhouse Recruiting",
          longName: "Greenhouse Recruiting",
        },
      },
      {
        itemID: "9201097963521_1",
        nameCode: {
          codeValue: "Vidcruiter Assessments",
          longName: "Vidcruiter Assessments",
        },
      },
    ],
    percentFields: [
      {
        itemID: "9201127985925_1",
        nameCode: {
          codeValue: "Bonus",
          shortName: "Bonus",
        },
      },
    ],
    stringFields: [
      {
        itemID: "2609456639_505",
        nameCode: {
          codeValue: "GUID",
          shortName: "GUID",
        },
      },
      {
        itemID: "9201127986141_1",
        nameCode: {
          codeValue: "Nkem Test Field",
          shortName: "Nkem Test Field",
        },
      },
      {
        itemID: "2057329100_260",
        nameCode: {
          codeValue: "Drivers License",
          shortName: "Drivers License",
        },
      },
    ],
  },
};

export const listWorkerDemoGraphicsResponse = {
  workers: [getWorkerDemographicsResponse],
  meta: null,
  confirmMessage: null,
};

export const geteTimeCardsResponse = {
  teamTimeCards: [
    {
      associateOID: "G36MAQ0N0WTQJ58W",
      workerID: {
        idValue: "ID1832264",
        schemeCode: {
          codeValue: "EmployeeID",
        },
      },
      personLegalName: {
        preferredSalutations: [],
        titlePrefixCodes: [],
        titleAffixCodes: [],
        givenName: "ovt6",
        familyName1: "emp6",
        formattedName: "emp6, ovt6",
      },
      timeCards: [
        {
          timeCardID: "10973668_25",
          exceptionsIndicator: false,
          processingStatusCode: {
            codeValue: "PROCESSED",
            shortName: "PROCESSED",
          },
          periodCode: {
            codeValue: "current",
            shortName: "Current Pay Period",
          },
          timePeriod: {
            startDate: "2020-12-01",
            endDate: "2020-12-14",
          },
          associateOID: "G36MAQ0N0WTQJ58W",
          workerID: {
            idValue: "ID1832264",
            schemeCode: {
              codeValue: "EmployeeID",
            },
          },
          personLegalName: {
            preferredSalutations: [],
            titlePrefixCodes: [],
            titleAffixCodes: [],
            givenName: "ovt6",
            familyName1: "emp6",
            formattedName: "emp6, ovt6",
          },
          positionID: "788165",
          exceptionCounts: [],
          periodTotals: [],
          dailyTotals: [],
          totalPeriodTimeDuration: "PT0S",
          homeLaborAllocations: [],
          dayEntries: [
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-01",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-02",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-03",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-04",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-05",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-06",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-07",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-08",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-09",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-10",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-11",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-12",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-13",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
            {
              totalPeriodTimeDuration: "PT0S",
              entryDate: "2020-12-14",
              timeEntries: [],
              actions: [
                {
                  operationID: "timeEntry.create",
                  confirmationRequiredIndicator: false,
                  defaultIndicator: false,
                  links: [
                    {
                      href: "/events/time/v2/time-entries.modify",
                      rel: "/adp/invoke",
                      title: "timeEntry.create",
                      method: "POST",
                    },
                  ],
                },
              ],
              links: [],
            },
          ],
          comments: [],
          actions: [
            {
              operationID: "timeSheet.review",
              confirmationRequiredIndicator: true,
              defaultIndicator: false,
              links: [
                {
                  href: "/events/time/v2/time-card.review",
                  rel: "/adp/invoke",
                  title: "Approve Timecard",
                  method: "POST",
                  payLoadArguments: [
                    {
                      argumentPath: "/data/eventContext/timeCardID",
                      argumentValue: "10973668_25",
                    },
                    {
                      argumentPath:
                        "/data/transform/timeCard/reviewStatusCode/codeValue",
                      argumentValue: "Approve",
                    },
                  ],
                },
              ],
            },
          ],
          reviewStatusCode: {},
          links: [
            {
              href: "/time/v2/workers/G36MAQ0N0WTQJ58W/time-cards/10973668_24?$expand=dayentries",
              rel: "/adp/invoke",
              title: "Previous Pay Period",
              method: "GET",
              payLoadArguments: [
                {
                  argumentPath: "timeCards/periodCode/codeValue",
                  argumentValue: "previous",
                },
                {
                  argumentPath: "timeCards/timePeriod/startDate",
                  argumentValue: "2020-11-17",
                },
                {
                  argumentPath: "timeCards/timePeriod/endDate",
                  argumentValue: "2020-11-30",
                },
              ],
            },
            {
              href: "/time/v2/workers/G36MAQ0N0WTQJ58W/time-cards/10973668_25?$expand=dayentries",
              rel: "/adp/invoke",
              title: "Current Pay Period",
              method: "GET",
              payLoadArguments: [
                {
                  argumentPath: "timeCards/periodCode/codeValue",
                  argumentValue: "current",
                },
                {
                  argumentPath: "timeCards/timePeriod/startDate",
                  argumentValue: "2020-12-01",
                },
                {
                  argumentPath: "timeCards/timePeriod/endDate",
                  argumentValue: "2020-12-14",
                },
              ],
            },
            {
              href: "/time/v2/workers/G36MAQ0N0WTQJ58W/time-cards/10973668_26?$expand=dayentries",
              rel: "/adp/invoke",
              title: "Next Pay Period",
              method: "GET",
              payLoadArguments: [
                {
                  argumentPath: "timeCards/periodCode/codeValue",
                  argumentValue: "next",
                },
                {
                  argumentPath: "timeCards/timePeriod/startDate",
                  argumentValue: "2020-12-15",
                },
                {
                  argumentPath: "timeCards/timePeriod/endDate",
                  argumentValue: "2020-12-28",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  meta: {
    startSequence: 0,
    completeIndicator: false,
    totalNumber: 20,
    links: [],
  },
  confirmMessage: {
    createDateTime: "2020-12-09T01:48:29-05:00",
    protocolStatusCode: {
      codeValue: "200",
    },
    protocolCode: {
      codeValue: "http",
    },
    requestStatusCode: {
      codeValue: "succeeded",
    },
    processMessages: [],
    resourceMessages: [],
  },
};

export const createPunchResponse = {
  events: [
    {
      eventID: "a7caff4e365747769529874a99000d71",
      serviceCategoryCode: {
        codeValue: "time",
      },
      eventNameCode: {
        codeValue: "/events/time/v1/data-collection-entries.process",
      },
      eventTitle: "Data Collection Entries Process",
      eventStatusCode: {
        codeValue: "complete",
      },
      recordDateTime: "Sep 21, 2020, 4:37:25 AM",
      creationDateTime: "Sep 21, 2020, 4:37:25 AM",
      effectiveDateTime: "Sep 21, 2020, 4:37:25 AM",
      links: [],
    },
  ],
  confirmMessage: {
    createDateTime: "Sep 21, 2020, 12:00:00 AM",
    protocolStatusCode: {
      codeValue: "202",
    },
    protocolCode: {
      codeValue: "http",
    },
    requestStatusCode: {
      codeValue: "SUCCEEDED",
    },
    requestMethodCode: {
      codeValue: "POST",
    },
    processMessages: [],
    resourceMessages: [
      {
        resourceMessageID: {
          idValue: "a7caff4e365747769529874a99000d71",
        },
        resourceStatusCode: {
          codeValue: "SUCCEEDED",
        },
        resourceLink: {
          href: "/events/time/v1/data-collection-entries.process/a7caff4e365747769529874a99000d71",
          rel: "ALTERNATE",
          mediaType: "APPLICATION_JSON",
          method: "GET",
          encType: "APPLICATION_JSON",
          payLoadArguments: [],
        },
        processMessages: [],
      },
    ],
  },
};

export const getClockingTransactionsResponse = {
  events: [
    {
      eventID: "d6254a05882a4461969f3c609c86e4ac",
      serviceCategoryCode: {
        codeValue: "time",
      },
      eventNameCode: {
        codeValue: "/events/time/v1/data-collection-entries.process",
      },
      eventTitle: "Data Collection Entries Process",
      eventStatusCode: {
        codeValue: "complete",
      },
      recordDateTime: "2020-09-23T04:56:59-04:00",
      creationDateTime: "2020-09-23T04:56:59-04:00",
      effectiveDateTime: "2020-09-23T04:56:59-04:00",
    },
  ],
  confirmMessage: {
    createDateTime: "2020-09-23T00:00:00-04:00",
    protocolStatusCode: {
      codeValue: "202",
    },
    protocolCode: {
      codeValue: "http",
    },
    requestStatusCode: {
      codeValue: "SUCCEEDED",
    },
    requestMethodCode: {
      codeValue: "POST",
    },
    processMessages: [],
    resourceMessages: [
      {
        resourceMessageID: {
          idValue: "d6254a05882a4461969f3c609c86e4ac",
        },
        resourceStatusCode: {
          codeValue: "SUCCEEDED",
        },
        resourceLink: {
          href: "/events/time/v1/data-collection-entries.process/d6254a05882a4461969f3c609c86e4ac",
          rel: "ALTERNATE",
          mediaType: "APPLICATION_JSON",
          method: "GET",
          encType: "APPLICATION_JSON",
        },
        processMessages: [],
      },
    ],
  },
};

export const modifiedEntryResponse = {
  meta: {
    resourceSetID: "654dd678b6c64d3fb3e815fd715832f8",
  },
  confirmMessage: {
    createDateTime: "2019-07-02T06:22:42-04:00",
    protocolStatusCode: {
      codeValue: "200",
    },
    protocolCode: {
      codeValue: "http",
    },
    requestStatusCode: {
      codeValue: "succeeded",
    },
    requestMethodCode: {
      codeValue: "GET",
    },
    processMessages: [
      {
        processMessageID: {
          idValue: "0",
        },
        messageTypeCode: {
          codeValue: "info",
        },
        userMessage: {
          codeValue: "info_IMP_TOTALCOUNT",
          title: "Import Statistics - Payload Total",
          messageTxt: "2",
        },
      },
      {
        processMessageID: {
          idValue: "1",
        },
        messageTypeCode: {
          codeValue: "info",
        },
        userMessage: {
          codeValue: "info_IMP_INPROCESSCOUNT",
          title: "Import Statistics – In-Process",
          messageTxt: "1",
        },
      },
    ],
    resourceMessages: [
      {
        resourceMessageID: {
          idValue: "654dd678b6c64d3fb3e815fd715832f8",
        },
        resourceStatusCode: {
          codeValue: "succeeded",
        },
        resourceLink: {
          rel: "self",
          href: "/events/time/v2/time-entries.modify/654dd678b6c64d3fb3e815fd715832f8",
          method: "GET",
          mediaType: "application/json",
          encType: "application/json",
        },
      },
    ],
  },
};

export const getPaymentDistributionMetaResponse = {
  meta: {
    "/data/eventContext": {
      "/worker": {
        readOnly: true,
        optional: false,
      },
      "/worker/associateOID": {
        readOnly: true,
        optional: false,
        hidden: true,
      },
      "/payDistribution": {
        readOnly: true,
        optional: false,
      },
      "/payDistribution/itemID": {
        readOnly: true,
        optional: false,
        hidden: true,
      },
    },
    "/data/transforms": [
      {
        "/effectiveDateTime": {
          readOnly: false,
          optional: false,
          hidden: false,
          shortLabelName: "Effective On",
          pattern:
            "^(((19|20|21)\\d\\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\\d|3[01]))?$",
        },
        "/payDistribution": {
          readOnly: false,
          optional: false,
        },
        "/payDistribution/distributionInstructions": {
          minItems: 0,
          maxItems: 3,
        },
        "/payDistribution/distributionInstructions/instructionStatusCode": {
          codeList: {
            codeListTitle: "Status",
            listItems: [
              {
                codeValue: "I",
                longName: "Inactive",
              },
              {
                codeValue: "A",
                longName: "Active",
              },
            ],
          },
          readOnly: false,
          optional: false,
        },
        "/payDistribution/distributionInstructions/precedenceCode/codeValue": {
          readOnly: false,
          optional: true,
          hidden: false,
          shortLabelName: "Priority Code",
          minLength: 1,
          maxLength: 999,
          pattern: "^([1-9][0-9]{0,2})$",
        },
        "/payDistribution/distributionInstructions/bonusOnlyIndicator": {
          readOnly: false,
          optional: true,
          hidden: false,
          shortLabelName: "Bonus",
        },
        "/payDistribution/distributionInstructions/prenote/prenoteOptionCode": {
          codeList: {
            codeListTitle: "Prenote Codes",
            listItems: [
              {
                codeValue: "N",
                longName: "No Prenote",
              },
              {
                codeValue: "D",
                longName: "Default Date",
              },
              {
                prenoteDate:
                  "^(((19|20|21)\\d\\d)-(0?[1-9]|1[012])-(0?[1-9]|[12]\\d|3[01]))?$",
                codeValue: "O",
                longName: "Custom",
              },
            ],
          },
          readOnly: false,
          optional: false,
        },
        "/payDistribution/distributionInstructions/depositAccount/financialParty/routingTransitID":
          {
            readOnly: false,
            optional: false,
          },
        "/payDistribution/distributionInstructions/depositAccount/financialParty/routingTransitID/idValue":
          {
            readOnly: false,
            optional: false,
            hidden: false,
            shortLabelName: "Transit ABA Number",
            minLength: 0,
            maxLength: 9,
            pattern: "^[0-9]*$",
          },
        "/payDistribution/distributionInstructions/depositAccount/financialAccount":
          {
            readOnly: false,
            optional: false,
          },
        "/payDistribution/distributionInstructions/depositAccount/financialAccount/accountNumber":
          {
            readOnly: false,
            optional: false,
            hidden: false,
            longLabelName: "Bank Deposit Account Number",
            minLength: 0,
            maxLength: 17,
            pattern: "^[-A-Z0-9]*$",
          },
        "/payDistribution/distributionInstructions/depositAccount/financialAccount/typeCode":
          {
            codeList: {
              codeListTitle: "Deposit Type",
              listItems: [
                {
                  foreignKey: "938",
                  codeValue: "K",
                  shortName: "Savings",
                },
                {
                  foreignKey: "938",
                  codeValue: "W",
                  shortName: "CHECKING",
                },
                {
                  foreignKey: "938",
                  codeValue: "X",
                  shortName: "CHECKING",
                },
                {
                  foreignKey: "938",
                  codeValue: "Y",
                  shortName: "SAVINGS",
                },
                {
                  foreignKey: "938",
                  codeValue: "Z",
                  shortName: "SAVINGS",
                },
              ],
              links: [
                {
                  href: "/payroll/v3/deduction-configurations/?$filter=companyCode eq '{foreignKey}' and category eq 'Direct Deposit'",
                  rel: "/adp/codelist",
                  title: "Deduction Configuration Code List",
                  method: "GET",
                  payLoadArguments: [
                    {
                      argumentPath: "foreignKey",
                      argumentValue: "companyCode",
                    },
                  ],
                },
              ],
            },
            readOnly: false,
            optional: false,
          },
        "/payDistribution/distributionInstructions/depositAccount/financialAccount/typeCode/codeValue":
          {
            readOnly: false,
            optional: false,
            hidden: false,
            shortLabelName: "Deposit Type",
          },
        "/payDistribution/distributionInstructions/distributionAmount": {
          readOnly: false,
          optional: true,
        },
        "/payDistribution/distributionInstructions/distributionAmount/amountValue":
          {
            readOnly: false,
            optional: true,
            hidden: false,
            shortLabelName: "Deduction Amount",
          },
        "/payDistribution/distributionInstructions/distributionPercentage": {
          readOnly: false,
          optional: true,
          hidden: false,
          shortLabelName: "Full Deposit",
          pattern: "^(100)?$",
        },
        "/payDistribution/distributionInstructions/remainingBalanceIndicator": {
          readOnly: false,
          optional: false,
        },
        "/payDistribution/distributionInstructions/itemID": {
          readOnly: false,
          optional: true,
          hidden: true,
        },
      },
    ],
    "/serviceCategoryCode/codeValue": "payroll",
    "/eventNameCode/codeValue": "worker.payDistribution.change",
  },
};

export const getWorkerPaymentDistributionResponse = {
  payDistributions: [
    {
      itemID: "37077879_753",
      requestedStartDate: "2019-03-07",
      distributionStatusCode: {
        codeValue: "A",
        shortName: "Active",
      },
      distributionInstructions: [
        {
          itemID: "42139379_1",
          bonusOnlyIndicator: false,
          instructionStatusCode: {
            codeValue: "A",
            shortName: "Active",
          },
          depositAccount: {
            financialParty: {
              routingTransitID: {
                idValue: "823456789",
              },
            },
            financialAccount: {
              accountNumber: "123456778",
              typeCode: {
                codeValue: "X",
                shortName: "CHECKING",
              },
            },
          },
          distributionAmount: {
            amountValue: 17,
          },
        },
      ],
      actions: [
        {
          operationID: "worker.payDistribution.change",
          canonicalUri:
            "/payroll/payrollManagement/payrollInstructionManagement/payDistributionManagement/worker.payDistribution.change",
          actionTypeCode: "callback",
          confirmationRequiredIndicator: true,
          defaultIndicator: false,
          attestation: {
            actionBlockIndicator: true,
            messageTxt:
              "Please read the statement below, and check the box to indicate that you Agree.  I authorize my Employer, through ADP as its payroll service provider, to deposit in my account (by initiating electronic credit entries) all amounts, (“deposits”) owed to me by my Employer at the financial institution specified above (the “Bank”), and I authorize the Bank to accept such deposits to my account. In the event that my Employer and/or ADP deposit funds into my account to which I am not entitled, I authorize my Employer, either directly or through ADP, to return such funds by initiating appropriate debit entries and adjustments accordingly. I understand that my deposit may not be credited to my account until the end of the day on the applicable pay date. It is my responsibility to: 1) ensure my bank account and deposit information is correct and complete; 2) timely verify that all transactions are accurate; and 3) immediately notify my Employer of any errors.  This authorization will remain in effect until I have cancelled it in writing with my Employer and Bank.",
          },
          links: [
            {
              href: "/events/payroll/v1/worker.pay-distribution.change",
              rel: "/adp/invoke",
              title: "Update Pay Distribution",
              method: "POST",
            },
          ],
        },
      ],
      payrollGroupCode: {
        codeValue: "94N",
        shortName: "94N",
      },
      payrollFileNumber: "7890",
    },
  ],
};

export const getPersonalContactsResponse = {
  itemID: "169750562647_284",
  personName: {
    formattedName: "Test Contact two",
  },
  address: {
    lineOne: "5800 Windward Parkway",
    lineTwo: "line2",
    lineThree: "line3",
    cityName: "Alpharetta",
    countrySubdivisionLevel1: {
      subdivisionType: "StateTerritory",
      codeValue: "GA",
      shortName: "Georgia",
      longName: "Georgia",
    },
    countryCode: "US",
    postalCode: "30005",
  },
  communication: {
    landlines: [
      {
        nameCode: {
          codeValue: "Home Phone",
          shortName: "Home Phone",
        },
        countryDialing: "1",
        areaDialing: "770",
        dialNumber: "7720252",
        formattedNumber: "(770) 772-0252",
        itemID: "169750562647_285",
      },
      {
        nameCode: {
          codeValue: "Work Phone",
          shortName: "Work Phone",
        },
        countryDialing: "1",
        areaDialing: "770",
        dialNumber: "7720252",
        extension: "123",
        access: "1",
        formattedNumber: "(770) 772-0252 123",
        itemID: "169750562647_287",
      },
      {
        nameCode: {
          codeValue: "Alternate Phone",
          shortName: "Alternate Phone",
        },
        countryDialing: "1",
        areaDialing: "770",
        dialNumber: "7720252",
        formattedNumber: "(770) 772-0252",
        itemID: "169750562647_288",
      },
    ],
    mobiles: [
      {
        nameCode: {
          codeValue: "Cell Phone",
          shortName: "Cell Phone",
        },
        countryDialing: "1",
        areaDialing: "770",
        dialNumber: "7720252",
        formattedNumber: "(770) 772-0252",
        itemID: "169750562647_286",
      },
    ],
    emails: [
      {
        itemID: "169750562647_284",
        nameCode: {
          codeValue: "E-mail",
          shortName: "E-mail",
        },
        emailUri: "email@test.com",
      },
    ],
  },
  contactTypeCode: {
    codeValue: "Emergency",
    shortName: "Emergency",
  },
  relationshipTypeCode: {
    codeValue: "O",
    shortName: "Other",
  },
  precedenceCode: {
    codeValue: "Primary",
    shortName: "Primary",
  },
};

export const listPersonalContactsResponse = {
  personalContacts: [
    getPersonalContactsResponse,
    {
      itemID: "169750562647_278",
      personName: {
        formattedName: "Test Contact add",
      },
      address: {
        lineOne: "5800 Windward Parkway",
        lineTwo: "line2",
        lineThree: "line3",
        cityName: "Alpharetta",
        countrySubdivisionLevel1: {
          subdivisionType: "StateTerritory",
          codeValue: "GA",
          shortName: "Georgia",
          longName: "Georgia",
        },
        countryCode: "US",
        postalCode: "30005",
      },
      communication: {
        landlines: [
          {
            nameCode: {
              codeValue: "Home Phone",
              shortName: "Home Phone",
            },
            countryDialing: "1",
            areaDialing: "770",
            dialNumber: "7720252",
            formattedNumber: "(770) 772-0252",
            itemID: "169750562647_279",
          },
          {
            nameCode: {
              codeValue: "Work Phone",
              shortName: "Work Phone",
            },
            countryDialing: "1",
            areaDialing: "770",
            dialNumber: "7720252",
            extension: "123",
            access: "1",
            formattedNumber: "(770) 772-0252 123",
            itemID: "169750562647_281",
          },
          {
            nameCode: {
              codeValue: "Alternate Phone",
              shortName: "Alternate Phone",
            },
            countryDialing: "1",
            areaDialing: "770",
            dialNumber: "7720252",
            formattedNumber: "(770) 772-0252",
            itemID: "169750562647_282",
          },
        ],
        mobiles: [
          {
            nameCode: {
              codeValue: "Cell Phone",
              shortName: "Cell Phone",
            },
            countryDialing: "1",
            areaDialing: "770",
            dialNumber: "7720252",
            formattedNumber: "(770) 772-0252",
            itemID: "169750562647_280",
          },
        ],
        emails: [
          {
            itemID: "169750562647_278",
            nameCode: {
              codeValue: "E-mail",
              shortName: "E-mail",
            },
            emailUri: "email@test.com",
          },
        ],
      },
      contactTypeCode: {
        codeValue: "Emergency",
        shortName: "Emergency",
      },
      relationshipTypeCode: {
        codeValue: "O",
        shortName: "Other",
      },
    },
  ],
};

export const getPersonalContactMetaResponse = {
  meta: {
    "/personalContacts/relationshipTypeCode/codeValue": {
      readOnly: false,
      optional: false,
      hidden: false,
    },
    "/personalContacts/relationshipTypeCode/shortName": {
      readOnly: false,
      optional: false,
      hidden: false,
    },
    "/personalContacts/relationshipTypeCode/longName": {
      readOnly: false,
      optional: false,
      hidden: false,
    },
    "/personalContacts/precedenceCode/codeValue": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/precedenceCode/shortName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/precedenceCode/longName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/personName/formattedName": {
      readOnly: false,
      optional: false,
      hidden: false,
      shortLabelName: "Full Name",
      minLength: 1,
      maxLength: 30,
    },
    "/personalContacts/address": {
      readOnly: false,
      optional: true,
    },
    "/personalContacts/address/lineOne": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Address Line 1",
      minLength: 0,
      maxLength: 30,
    },
    "/personalContacts/address/lineTwo": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Address Line 2",
      minLength: 0,
      maxLength: 30,
    },
    "/personalContacts/address/lineThree": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Address Line 3",
      minLength: 0,
      maxLength: 30,
    },
    "/personalContacts/address/cityName": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "City",
      minLength: 0,
      maxLength: 30,
    },
    "/personalContacts/address/countrySubdivisionLevel1/codeValue": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/address/countrySubdivisionLevel1/shortName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/address/countrySubdivisionLevel1/longName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/address/countrySubdivisionLevel1/subdivisionType": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/address/countryCode": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Country",
      minLength: 0,
      maxLength: 2,
    },
    "/personalContacts/address/postalCode": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Zip Code",
      minLength: 0,
      maxLength: 10,
      pattern:
        "([0-9][0-9][0-9][0-9][0-9])|([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])|([0-9][0-9][0-9][0-9][0-9][-][0-9][0-9][0-9][0-9])",
    },
    "/personalContacts/communication/landlines": {
      minItems: 0,
      maxItems: 3,
    },
    "/personalContacts/communication/landlines/nameCode/codeValue": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/communication/landlines/nameCode/shortName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/communication/landlines/nameCode/longName": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/communication/landlines/countryDialing": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Country Code",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/landlines/areaDialing": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Area Code",
      minLength: 0,
      maxLength: 5,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/landlines/dialNumber": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Dial Number",
      minLength: 0,
      maxLength: 16,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/landlines/extension": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Extension",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/landlines/access": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "National Prefix",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/landlines/formattedNumber": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Home Phone",
    },
    "/personalContacts/communication/mobiles": {
      minItems: 0,
      maxItems: 3,
    },
    "/personalContacts/communication/mobiles/countryDialing": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Country Code",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/mobiles/areaDialing": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Dial Number",
      minLength: 0,
      maxLength: 16,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/mobiles/dialNumber": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Area Code",
      minLength: 0,
      maxLength: 5,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/mobiles/extension": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Extension",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/mobiles/access": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "National Prefix",
      minLength: 0,
      maxLength: 3,
      pattern: "^[0-9]*$",
    },
    "/personalContacts/communication/mobiles/formattedNumber": {
      readOnly: false,
      optional: true,
      hidden: false,
      shortLabelName: "Personal Mobile",
    },
    "/personalContacts/communication/emails": {
      minItems: 0,
      maxItems: 1,
    },
    "/personalContacts/communication/emails/nameCode": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/communication/emails/nameCode/codeValue": {
      readOnly: false,
      optional: true,
      hidden: false,
    },
    "/personalContacts/communication/emails/emailUri": {
      readOnly: false,
      optional: false,
      hidden: false,
      shortLabelName: "Email Address",
      minLength: 0,
      maxLength: 64,
    },
  },
};

export const deletePersonaContactResponse = {
  events: [
    {
      eventStatusCode: {
        codeValue: "complete",
        shortName: "complete",
      },
      data: {
        eventContext: {
          worker: {
            associateOID: "G372T336YEJ07AWG",
          },
          personalContact: {
            itemID: "169750562647_272",
          },
        },
      },
    },
  ],
};

export const addPersonalContactResponse = {
  events: [
    {
      eventStatusCode: {
        codeValue: "complete",
        shortName: "complete",
      },
      data: {
        eventContext: {
          worker: {
            associateOID: "G372T336YEJ07AWG",
          },
        },
        output: {
          personalContact: {
            itemID: "169750562647_229",
            personName: {
              formattedName: "Test Contact add",
            },
            address: {
              lineOne: "5800 Windward Parkway",
              lineTwo: "line2",
              lineThree: "line3",
              cityName: "Alpharetta",
              countrySubdivisionLevel1: {
                subdivisionType: "StateTerritory",
                codeValue: "GA",
                shortName: "Georgia",
                longName: "Georgia",
              },
              countryCode: "US",
              postalCode: "30005",
            },
            communication: {
              landlines: [
                {
                  nameCode: {
                    codeValue: "Home Phone",
                    shortName: "Home Phone",
                  },
                  countryDialing: "1",
                  areaDialing: "770",
                  dialNumber: "7720252",
                  formattedNumber: "(770) 772-0252",
                  itemID: "169750562647_230",
                },
                {
                  nameCode: {
                    codeValue: "Work Phone",
                    shortName: "Work Phone",
                  },
                  countryDialing: "1",
                  areaDialing: "770",
                  dialNumber: "7720252",
                  extension: "123",
                  access: "1",
                  formattedNumber: "(770) 772-0252 123",
                  itemID: "169750562647_232",
                },
                {
                  nameCode: {
                    codeValue: "Alternate Phone",
                    shortName: "Alternate Phone",
                  },
                  countryDialing: "1",
                  areaDialing: "770",
                  dialNumber: "7720252",
                  formattedNumber: "(770) 772-0252",
                  itemID: "169750562647_233",
                },
              ],
              mobiles: [
                {
                  nameCode: {
                    codeValue: "Cell Phone",
                    shortName: "Cell Phone",
                  },
                  countryDialing: "1",
                  areaDialing: "770",
                  dialNumber: "7720252",
                  formattedNumber: "(770) 772-0252",
                  itemID: "169750562647_231",
                },
              ],
              emails: [
                {
                  itemID: "169750562647_229",
                  nameCode: {
                    codeValue: "E-mail",
                    shortName: "E-mail",
                  },
                  emailUri: "email@test.com",
                },
              ],
            },
            contactTypeCode: {
              codeValue: "Emergency",
              shortName: "Emergency",
            },
            relationshipTypeCode: {
              codeValue: "O",
              shortName: "Other",
            },
            precedenceCode: {
              codeValue: "Primary",
              shortName: "Primary",
            },
          },
        },
      },
    },
  ],
};

export const createCustomFieldResponse = {
  events: [
    {
      data: {
        eventContext: {
          worker: {
            associateOID: "AOID0WS09KXQJ69Q",
            person: {
              customFieldGroup: {
                amountField: {
                  itemID: "33646745_1",
                },
              },
            },
          },
        },
        output: {
          worker: {
            person: {
              customFieldGroup: {
                amountField: {
                  itemID: "33646745_1",
                  nameCode: {
                    codeValue: "CustomAmountField",
                    shortName: "CustomAmountField",
                  },
                  categoryCode: {
                    codeValue: "X",
                    shortName: "Volunteer",
                  },
                  amountValue: 600,
                  currencyCode: "USD",
                },
              },
            },
          },
        },
      },
      eventStatusCode: {
        codeValue: "complete",
        shortName: "complete",
      },
      links: [],
    },
  ],
};

export const getCustomFieldMetaResponse = {
  events: [
    {
      data: {
        eventContext: {
          worker: {
            associateOID: "AOID0WS09KXQJ69Q",
            person: {
              customFieldGroup: {
                codeField: {
                  itemID: "33646694_1",
                },
              },
            },
          },
        },
        output: {
          worker: {
            person: {
              customFieldGroup: {
                codeField: {
                  itemID: "33646694_1",
                  nameCode: {
                    codeValue: "CodedField",
                    shortName: "CodedField",
                  },
                  codeValue: "DropList",
                },
              },
            },
          },
        },
      },
      eventStatusCode: {
        codeValue: "complete",
        shortName: "complete",
      },
      links: [],
    },
  ],
};

export const listCompanyCodesResponse = {
  codeListTitle: "Company Code",
  listItems: [
    {
      code: "4SN",
      name: "WFN 4.0 SC Master",
      category: "US",
    },
  ],
};

export const selectWorkerExamplePayload = {
  result: [
    {
      label: "NewHire, test761 two (3WC5KYA4L)",
      key: "G3R47DSRZK5TRCFJ",
    },
    {
      label: "Doe, John (WORKER123)",
      key: "G3R47DSRZK5TRCFK",
    },
  ],
};

export const selectPersonalContactExamplePayload = {
  result: [
    {
      label: "Test Contact two",
      key: "169750562647_284",
    },
    {
      label: "Test Contact add",
      key: "169750562647_278",
    },
  ],
};
