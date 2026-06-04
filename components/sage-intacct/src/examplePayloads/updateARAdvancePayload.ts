

export const updateARAdvancePayload = {
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
              sessiontimestamp: ["2024-01-10T17:30:15+00:00"],
              sessiontimeout: ["2024-01-11T01:30:15+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["update"],
              controlid: ["b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e"],
              key: ["9834"],
            },
          ],
        },
      ],
    },
  },
};
