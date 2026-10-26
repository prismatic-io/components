export const getRaasReportExamplePayload = {
  data: {
    Report_Entry: [
      {
        Employee_ID: "21001",
        Worker: "Logan McNeil",
        Position_ID: "P-00012",
        Business_Title: "Vice President, Human Resources",
        Supervisory_Organization: "Human Resources (Logan McNeil)",
        Location: "San Francisco",
        Hire_Date: "2000-01-01",
      },
    ],
  },
};
export const runWqlQueryExamplePayload = {
  data: {
    total: 1,
    data: [
      {
        worker: {
          descriptor: "Logan McNeil",
          id: "3aa5550b7fe348b98d7b5741afc65534",
        },
        fullName: "Logan McNeil",
      },
    ],
  },
};
export const verifyConnectionExamplePayload = {
  data: {
    tokenExchanged: true,
    reportRead: true,
    reportEntryCount: 12,
  },
};
