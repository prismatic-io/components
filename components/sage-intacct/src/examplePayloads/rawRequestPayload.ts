


export const rawRequestPayload = {
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
              sessiontimestamp: ["2024-01-15T16:00:00+00:00"],
              sessiontimeout: ["2024-01-16T00:00:00+00:00"],
            },
          ],
          result: [
            {
              status: ["success"],
              function: ["query"],
              controlid: ["d4e5f6a7-b8c9-0d1e-2f3a-4b5c6d7e8f9a"],
              data: [
                {
                  $: {
                    listtype: "contact",
                    count: "2",
                    totalcount: "2",
                    numremaining: "0",
                    resultId: "",
                  },
                  contact: [
                    {
                      RECORDNO: ["1234"],
                      CONTACTNAME: ["John Doe"],
                      COMPANYNAME: ["Acme Corporation"],
                      FIRSTNAME: ["John"],
                      LASTNAME: ["Doe"],
                      EMAIL1: ["john.doe@example.com"],
                      PHONE1: ["555-0100"],
                      STATUS: ["active"],
                    },
                    {
                      RECORDNO: ["1235"],
                      CONTACTNAME: ["Jane Smith"],
                      COMPANYNAME: ["Beta Industries"],
                      FIRSTNAME: ["Jane"],
                      LASTNAME: ["Smith"],
                      EMAIL1: ["jane.smith@example.com"],
                      PHONE1: ["555-0200"],
                      STATUS: ["active"],
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
