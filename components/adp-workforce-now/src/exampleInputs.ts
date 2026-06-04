export const timeEntryPayload = [
  {
    servericeCategoryCode: {
      codeValue: "TIME",
    },
    eventNameCode: {
      codeValue: "TIME_ENTRIES_MODIFY",
    },
    data: {
      eventContext: {
        associateOID: "{{employeeAOID}}",
        workAssignmentID: "{{workAssignmentID}}",
      },
      transform: {
        timeEntries: [
          {
            entryTypeCode: {
              codeValue: "hoursEntry",
            },
            entryCode: {
              codeValue: "REGULAR_PAY",
            },
            entryDate: "2020-09-25",
            timeDuration: "PT8H",
            startPeriod: {
              startDateTime: "2020-09-25T08:00:00+05:30",
            },
            _changeCode: "add",
          },
        ],
      },
    },
  },
  {
    servericeCategoryCode: {
      codeValue: "TIME",
    },
    eventNameCode: {
      codeValue: "TIME_ENTRIES_MODIFY",
    },
    data: {
      eventContext: {
        associateOID: "G3V2JFHYFPG9ZZVC",
        workAssignmentID: "64711919N",
      },
      transform: {
        timeEntries: [
          {
            entryTypeCode: {
              codeValue: "hoursEntry",
            },
            entryCode: {
              codeValue: "REGULAR_PAY",
            },
            entryDate: "2020-09-25",
            timeDuration: "PT8H",
            startPeriod: {
              startDateTime: "2020-09-25T08:00:00+05:30",
            },
            _changeCode: "add",
          },
        ],
      },
    },
  },
];

export const applicantOnboardingProcessPayload = {
  onboardingTemplateCode: {
    code: "{{onboardingTemplateCode}}",
  },
  onboardingStatus: {
    statusCode: {
      code: "inprogress",
    },
  },
  applicantPersonalProfile: {
    birthName: {
      givenName: "{{firstName}}",
      familyName: "{{lastName}}",
    },
    governmentIDs: [
      {
        id: "",
        nameCode: {
          code: "SSN",
        },
        statusCode: {
          code: "AppliedFor",
        },
      },
    ],
  },
  applicantWorkerProfile: {
    hireDate: "{{timestamp}}",
  },
  applicantPayrollProfile: {
    payrollGroupCode: "{{companyCode}}",
  },
  applicantTaxProfile: {},
};

export const paymentDistributionPayload = {
  effectiveDateTime: "2024-05-31",
  payDistribution: {
    distributionInstructions: [
      {
        distributionPercentage: "50",
        depositAccount: {
          financialAccount: {
            accountNumber: "123456778",
            typeCode: {
              codeValue: "x",
            },
          },
          financialParty: {
            routingTransitID: {
              idValue: "823456789",
            },
          },
        },
      },
    ],
  },
};

export const personalContactPayload = {
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
      },
    ],
    emails: [
      {
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
  },
};

export const customFieldGroupPayload = {
  nameCode: {
    shortName: "National Gift of Life Donation Initiative - Organ Donor",
  },
  categoryCode: {
    codeValue: "X",
    shortName: "Volunteer",
  },
  currencyCode: "USD",
  amountValue: 600,
};
