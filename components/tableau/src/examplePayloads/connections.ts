const connectionObject = {
  id: "37d015c6-bc28-4c88-989c-72c0a171f7aa",
  type: "sqlserver",
  serverAddress: "db.example.com",
  serverPort: "1433",
  userName: "tableau_reader",
  datasource: {
    id: "e4b1c3a2-d5f6-7890-abcd-1234567890ab",
    name: "Sales Data",
  },
};

export const listConnectionsExamplePayload = {
  data: {
    pagination: {
      pageNumber: "1",
      pageSize: "100",
      totalAvailable: "3",
    },
    connections: {
      connection: [connectionObject],
    },
  },
};

export const searchConnectionsExamplePayload = {
  data: [connectionObject],
};

export const updateConnectionExamplePayload = {
  data: {
    connection: connectionObject,
  },
};
