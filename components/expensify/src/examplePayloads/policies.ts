export const getPolicyExamplePayload = {
  data: {
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
  },
};

export const listPoliciesExamplePayload = {
  data: {
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
        id: "F005BA1100009999",
        type: "corporate",
      },
    ],
    responseCode: 200,
  },
};

export const createPolicyExamplePayload = {
  data: {
    responseCode: 200,
    policyID: "0123456789ABCDEF",
    policyName: "My New Policy",
  },
};

export const updatePolicyExamplePayload = {
  data: {
    responseCode: 200,
  },
};
