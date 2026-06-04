






export const createExpenseExamplePayload = {
  responseCode: 200,
  transactionList: [
    {
      amount: 1234,
      merchant: "Name Of Merchant 1",
      created: "2016-01-01",
      transactionID: "6720309558248016",
      currency: "USD",
    },
    {
      amount: 2211,
      merchant: "Name Of Merchant 2",
      created: "2016-01-31",
      transactionID: "6720309558248017",
      currency: "CAD",
    },
  ],
};

export const createReportExamplePayload = {
  responseCode: 200,
  reportName: "Name of the report",
  reportID: "R006AseGxMka",
};

export const getPolicyExamplePayload = {
  responseCode: 200,
  policyInfo: {
    "4C6722D4BD2BD941": {
      reportFields: [
        {
          values: [],
          name: "title",
          type: "formula",
        },
        {
          values: ["Class 1", "Class 2", "Class 2:Sub class 2"],
          name: "Classes",
          type: "dropdown",
        },
        {
          values: ["Donatello", "Leonardo", "Michelangelo", "Rafael"],
          name: "Customers/Jobs",
          type: "dropdown",
        },
      ],
      categories: [
        {
          name: "Entertainment",
          enabled: true,
        },
        {
          name: "Transportation",
          enabled: true,
        },
        {
          name: "Phone",
          enabled: true,
        },
        {
          name: "Fuel/Mileage",
          enabled: true,
        },
        {
          name: "Lodging",
          enabled: true,
        },
        {
          name: "Meals",
          enabled: true,
        },
        {
          name: "Other",
          enabled: false,
        },
      ],
      tags: [
        {
          glCode: "",
          name: "Enterprise",
          enabled: true,
        },
        {
          glCode: "",
          name: "Enterprise:Jean-Luc Picard",
          enabled: true,
        },
        {
          glCode: "",
          name: "Enterprise:Lt. Commander Data",
          enabled: true,
        },
        {
          glCode: "",
          name: "Enterprise:William Riker",
          enabled: true,
        },
      ],
      tax: {
        default: "4",
        rates: [
          {
            rate: 0,
            name: "EC Goods Zero-rated",
            rateID: "5",
          },
          {
            rate: 0,
            name: "EC Services Standard",
            rateID: "4",
          },
          {
            rate: 20,
            name: "Standard",
            rateID: "2",
          },
          {
            rate: 5,
            name: "Reduced",
            rateID: "9",
          },
        ],
        name: "Tax",
      },
    },
    "3F329EA1C3809E6C": {
      categories: [
        {
          name: "Phone Costs",
          areCommentsRequired: false,
          enabled: false,
        },
        {
          name: "Legal",
          areCommentsRequired: false,
          enabled: false,
        },
        {
          name: "Agency Expense",
          areCommentsRequired: false,
          enabled: false,
        },
      ],
      reportFields: [
        {
          values: [],
          name: "title",
          type: "formula",
        },
      ],
      tags: [
        {
          name: "Tags",
          tags: [],
        },
      ],
      tax: {},
      employees: [
        {
          email: "admin@domain.com",
          role: "admin",
          submitsTo: "user@domain.com",
        },
        {
          email: "user@domain.com",
          role: "user",
          submitsTo: "admin@domain.com",
          employeeID: "Emp1",
          customField2: "custom information",
        },
      ],
    },
  },
};

export const listPolicyExamplePayload = {
  policyList: [
    {
      outputCurrency: "USD",
      owner: "admin@acmecorp.com",
      role: "user",
      name: "Acme Corp USA Policy",
      id: "DEADBEEF12345678",
      type: "corporate",
    },
    {
      outputCurrency: "EUR",
      owner: "admin@acmecorp.com",
      role: "auditor",
      name: "Acme Corp France Policy",
      id: "BA5EBA1187654321",
      type: "corporate",
    },
    {
      outputCurrency: "USD",
      owner: "hr@acmecorp.com",
      role: "admin",
      name: "ACME Corp Candidate Policy",
      id: "F005BA11000099999",
      type: "corporate",
    },
  ],
  responseCode: 200,
};

export const createPolicyExamplePayload = {
  responseCode: 200,
  policyID: "0123456789ABCDEF",
  policyName: "My New Policy",
};

export const updateEmployeeExamplePayload = {
  responseCode: 200,
  "dry-run": false,
  updatedEmployeesCount: 3,
  diff: {
    diffToAdd: {
      "0123456789ABCDEF": ["employee1@domain.com", "employee2@domain.com"],
      ABCDEF0123456789: ["employee3@domain.com"],
    },
    diffToRemove: {
      B1C7903C636F4A51: ["terminatedEmployee@domain.com"],
    },
  },
  securityGroupEmployeesMap: {
    "407184": ["employee1@domain.com", "employee2@domain.com"],
    "830936": ["employee3@domain.com"],
  },
  skippedEmployees: [
    {
      email: "employee6@domain.com",
      reason: "No policy found for 'Marketing'",
    },
    {
      email: "employee7@domain.com",
      reason: "Invalid manager email address 'manager@domain '",
    },
  ],
};

export const updateReportStatusExamplePayload = {
  responseCode: 200,
  reportIDs: ["R006AseGxMka", "R00bCluvcO4T"],
};
