

export const updateARAdjustmentPayload = {
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
              sessiontimestamp: ["2024-01-15T14:30:45+00:00"],
              sessiontimeout: ["2024-01-15T22:30:45+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["update"],
              controlid: ["d9e0f1a2-b3c4-5d6e-7f8a-9b0c1d2e3f4a"],
              key: ["8652"],
            },
          ],
        },
      ],
    },
  },
};
