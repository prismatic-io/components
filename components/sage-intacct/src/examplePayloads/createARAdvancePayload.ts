

export const createARAdvancePayload = {
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
              sessiontimestamp: ["2024-01-10T16:45:20+00:00"],
              sessiontimeout: ["2024-01-11T00:45:20+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["create"],
              controlid: ["a1b2c3d4-e5f6-7a8b-9c0d-1e2f3a4b5c6d"],
              key: ["9834"],
            },
          ],
        },
      ],
    },
  },
};
