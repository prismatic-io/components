export const createInvoicePayload = {
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
              sessiontimestamp: ["2024-01-11T20:06:13+00:00"],
              sessiontimeout: ["2024-01-12T04:06:13+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["create_invoice"],
              controlid: ["3a7463e3-d65e-4056-be1a-158f2cf51234"],
              key: ["4774"],
            },
          ],
        },
      ],
    },
  },
};
