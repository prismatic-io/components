



export const describeOpportunitiesExamplePayload = {
  data: {
    requestId: "185d6#14b51985ff0",
    success: true,
    result: [
      {
        name: "opportunity",
        displayName: "Opportunity",
        createdAt: "2015-02-03T22:36:23Z",
        updatedAt: "2015-02-03T22:36:24Z",
        idField: "marketoGUID",
        dedupeFields: ["externalOpportunityId"],
        searchableFields: [["externalOpportunityId"], ["marketoGUID"]],
        fields: [
          {
            name: "marketoGUID",
            displayName: "Marketo GUID",
            dataType: "string",
            length: 36,
            updateable: false,
          },
          {
            name: "createdAt",
            displayName: "Created At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "updatedAt",
            displayName: "Updated At",
            dataType: "datetime",
            updateable: false,
          },
          {
            name: "externalOpportunityId",
            displayName: "External Opportunity Id",
            dataType: "string",
            length: 50,
            updateable: false,
          },
        ],
      },
    ],
  },
};

export const getOpportunitiesByFilterExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fa",
        externalOpportunityId: "19UYA31581L000000",
        name: "Chairs",
        description: "Chairs",
        amount: "1604.47",
        source: "Inbound Sales Call/Email",
      },
      {
        seq: 1,
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fc",
        externalOpportunityId: "29UYA31581L000000",
        name: "Big Dog Day Care-Phase12",
        description: "Big Dog Day Care-Phase12",
        amount: "1604.47",
        source: "Email",
      },
    ],
  },
};

export const syncOpportunitiesExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        status: "updated",
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fb",
      },
      {
        seq: 1,
        status: "created",
        marketoGUID: "cff23271-f996-47d7-984f-f2676861b5fb",
      },
    ],
  },
};

export const deleteOpportunitiesExamplePayload = {
  data: {
    requestId: "e42b#14272d07d78",
    success: true,
    result: [
      {
        seq: 0,
        marketoGUID: "dff23271-f996-47d7-984f-f2676861b5fb",
        status: "deleted",
      },
      {
        seq: 1,
        marketoGUID: "cff23271-f996-47d7-984f-f2676861b5fb",
        status: "deleted",
      },
    ],
  },
};
