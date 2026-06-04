

export const updateInvoicePayload = {
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
              sessiontimestamp: ["2024-01-15T14:22:10+00:00"],
              sessiontimeout: ["2024-01-15T22:22:10+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["update_invoice"],
              controlid: ["b8c9d3e4-f5a6-7b8c-9d0e-1f2a3b4c5d6e"],
              key: ["4774"],
            },
          ],
        },
      ],
    },
  },
};
