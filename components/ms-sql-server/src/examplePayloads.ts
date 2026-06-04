










export const queryExamplePayload = {
  data: {
    recordsets: [
      [
        {
          id: 1,
          first_name: "Alice",
          last_name: "Johnson",
          email: "alice.johnson@example.com",
          created_at: "2024-08-15T10:30:00.000Z",
        },
        {
          id: 2,
          first_name: "Bob",
          last_name: "Martinez",
          email: "bob.martinez@example.com",
          created_at: "2024-09-22T14:45:00.000Z",
        },
      ],
      // biome-ignore lint/suspicious/noExplicitAny: mssql IResult recordsets type is a union incompatible with typed arrays
    ] as any,
    recordset: [
      {
        id: 1,
        first_name: "Alice",
        last_name: "Johnson",
        email: "alice.johnson@example.com",
        created_at: "2024-08-15T10:30:00.000Z",
      },
      {
        id: 2,
        first_name: "Bob",
        last_name: "Martinez",
        email: "bob.martinez@example.com",
        created_at: "2024-09-22T14:45:00.000Z",
      },
    ],
    output: {},
    rowsAffected: [2],
  },
};












export const executeExamplePayload = {
  data: {
    recordsets: [
      [
        {
          id: 1,
          status: "active",
          last_updated: "2024-10-01T08:00:00.000Z",
        },
      ],
      // biome-ignore lint/suspicious/noExplicitAny: mssql IProcedureResult recordsets type is a union incompatible with typed arrays
    ] as any,
    recordset: [
      {
        id: 1,
        status: "active",
        last_updated: "2024-10-01T08:00:00.000Z",
      },
    ],
    output: {},
    rowsAffected: [1],
    returnValue: 0,
  },
};
