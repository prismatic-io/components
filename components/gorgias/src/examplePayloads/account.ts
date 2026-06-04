




import type { GetAccountResponse } from "../interfaces/account";

export const getAccountExamplePayload: { data: GetAccountResponse } = {
  data: {
    created_datetime: "2017-11-23T15:59:41.966927",
    deactivated_datetime: null,
    domain: "company_name",
    settings: [
      {
        id: 987,
        type: "business-hours",
        data: {
          timezone: "UTC",
          business_hours: {
            days: "1,2,3,4,5",
            from_time: "09:00",
            to_time: "22:00",
          },
        },
      },
    ],
    status: {
      status: "active",
    },
  },
};
