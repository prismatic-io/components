export const createBillPayload = {
  data: {
    response: {
      control: [
        {
          status: ["success"],
          senderid: ["testgroup"],
          controlid: ["1704925436123"],
          uniqueid: ["false"],
          dtdversion: ["3.0"],
        },
      ],
      operation: [
        {
          authentication: [
            {
              status: ["success"],
              userid: ["TestUser"],
              companyid: ["testgroup-imp"],
              locationid: ["firstchoice"],
              sessiontimestamp: ["2024-01-10T22:23:57+00:00"],
              sessiontimeout: ["2024-01-11T06:23:57+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["create"],
              controlid: ["49143589-7eff-4a44-a049-378ed812345"],
              data: [
                {
                  $: {
                    listtype: "objects",
                    count: "1",
                  },
                  apbill: [
                    {
                      RECORDNO: ["4760"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  },
};
