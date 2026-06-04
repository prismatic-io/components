

export const deleteObjectPayload = {
  data: {
    response: {
      control: [
        {
          status: ["success"],
          senderid: ["example"],
          controlid: ["1705003571234"],
          uniqueid: ["false"],
          dtdversion: ["3.0"],
        },
      ],
      operation: [
        {
          authentication: [
            {
              status: ["success"],
              userid: ["UtilizeCore"],
              companyid: ["example-imp"],
              locationid: ["example-location"],
              sessiontimestamp: ["2024-01-15T15:20:00+00:00"],
              sessiontimeout: ["2024-01-15T23:20:00+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["delete"],
              controlid: ["c3d4e5f6-a7b8-9c0d-1e2f-3a4b5c6d7e8f"],
            },
          ],
        },
      ],
    },
  },
};
