export const updateEmployeeExamplePayload = {
  data: {
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
  },
};
