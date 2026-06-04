



export const describeLeadExamplePayload = {
  data: {
    requestId: "37ca#1475b74e276",
    success: true,
    result: [
      {
        id: 2,
        displayName: "Company Name",
        dataType: "string",
        length: 255,
        rest: {
          name: "company",
          readOnly: false,
        },
        soap: {
          name: "Company",
          readOnly: false,
        },
      },
    ],
  },
};

export const getSearchableLeadFieldsExamplePayload = {
  data: {
    requestId: "14d51#17e955b44f0",
    result: [
      {
        name: "Lead",
        searchableFields: [["email"]],
        fields: [
          {
            name: "email",
            displayName: "Email Address",
            dataType: "email",
            length: 255,
            updateable: true,
            crmManaged: false,
          },
        ],
      },
    ],
  },
};

export const getLeadByIdExamplePayload = {
  data: {
    requestId: "10226#14d3049e51b",
    success: true,
    result: [
      {
        id: 318581,
        updatedAt: "2015-05-07T11:47:30-08:00",
        lastName: "Doe",
        email: "jdoe@marketo.com",
        createdAt: "2015-05-01T16:47:30-08:00",
        firstName: "John",
      },
    ],
  },
};

export const getLeadsByFilterExamplePayload = {
  data: {
    requestId: "12951#15699db5c97",
    result: [
      {
        id: 318581,
        updatedAt: "2016-05-17T22:11:45Z",
        lastName: "Lincoln",
        email: "abe@usa.gov",
        createdAt: "2015-03-17T00:18:40Z",
        firstName: "Abraham",
      },
      {
        id: 318592,
        updatedAt: "2016-05-17T22:20:51Z",
        lastName: "Washington",
        email: "george@usa.gov",
        createdAt: "2015-04-06T16:29:21Z",
        firstName: "George",
      },
    ],
    success: true,
  },
};

export const syncLeadsExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        id: 50,
        status: "created",
      },
      {
        id: 51,
        status: "created",
      },
      {
        id: 52,
        status: "created",
      },
    ],
  },
};

export const deleteLeadsExamplePayload = {
  data: {
    requestId: "3608#16664333670",
    result: [
      {
        id: 235,
        status: "deleted",
      },
      {
        id: 766,
        status: "deleted",
      },
    ],
    success: true,
  },
};
