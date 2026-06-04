export const DEFAULT_POLLING_CRM_FIELDS = ["Created_Time", "Modified_Time", "Full_Name"];
export const DEFAULT_POLLING_SORT_FIELD = "Modified_Time";
export const DEFAULT_POLLING_SORT_ORDER = "desc";
export const DEFAULT_PER_PAGE = 200;
export const DEFAULT_PAGE_NUMBER = 1;

export const NOTIFICATION_EVENTS_EXAMPLE = ["Leads.create", "Deals.edit"];

export const NOTIFICATION_CONDITION_EXAMPLE = [
  {
    type: "field_selection",
    module: {
      api_name: "Deals",
      id: "554023000000000131",
    },
    field_selection: {
      group_operator: "or",
      group: [
        {
          field: {
            api_name: "Stage",
            id: "554023000000000525",
          },
        },
        {
          group_operator: "and",
          group: [
            {
              field: {
                api_name: "Account_Name",
                id: "554023000000000523",
              },
            },
            {
              field: {
                api_name: "Lead_Source",
                id: "554023000000000535",
              },
            },
          ],
        },
      ],
    },
  },
];
