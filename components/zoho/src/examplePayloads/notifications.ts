



export const getNotificationDetailsExamplePayload = {
  data: {
    watch: [
      {
        notify_on_related_action: false,
        channel_expiry: "2023-08-02T16:51:03-11:00",
        return_affected_field_values: false,
        resource_uri: "https://www.zohoapis.com/crm/v8/Leads",
        resource_id: "554023000000000125",
        notify_url: "https://webhook.site/2c9xxx0fa9",
        resource_name: "Leads",
        fields: null,
        notification_condition: [
          {
            field_selection: {
              group_operator: "and",
              group: [
                {
                  field: {
                    api_name: "Last_Name",
                    id: "554023000000000559",
                  },
                  group_operator: null,
                  group: null,
                },
                {
                  field: {
                    api_name: "Full_Name",
                    id: "554023000000000597",
                  },
                  group_operator: null,
                  group: null,
                },
              ],
            },
            module: {
              api_name: "Leads",
              id: "554023000000000125",
            },
            type: "field_selection",
          },
        ],
        channel_id: "1000000068001",
        events: ["Leads.edit", "Leads.create", "Leads.delete"],
        token: "xyz",
      },
      {
        notify_on_related_action: false,
        channel_expiry: "2023-08-11T02:12:33-11:00",
        return_affected_field_values: false,
        resource_uri: "https://www.zohoapis.com/crm/v8/Contacts",
        resource_id: "554023000000000129",
        notify_url: "https://webhook.site/2c9axx20fa9",
        resource_name: "Contacts",
        fields: null,
        notification_condition: null,
        channel_id: "10000",
        events: ["Contacts.create"],
        token: "deals.all.notif",
      },
      {
        notify_on_related_action: false,
        channel_expiry: "2023-08-11T02:13:01-11:00",
        return_affected_field_values: false,
        resource_uri: "https://www.zohoapis.com/crm/v8/Deals",
        resource_id: "554023000000000131",
        notify_url: "https://webhook.site/2c9a0xx20fa9",
        resource_name: "Deals",
        fields: null,
        notification_condition: [
          {
            field_selection: {
              group_operator: "or",
              group: [
                {
                  field: {
                    api_name: "Stage",
                    id: "554023000000000525",
                  },
                  group_operator: null,
                  group: null,
                },
                {
                  group_operator: "or",
                  group: [
                    {
                      field: {
                        api_name: "Account_Name",
                        id: "554023000000000523",
                      },
                      group_operator: null,
                      group: null,
                    },
                    {
                      field: {
                        api_name: "Lead_Source",
                        id: "554023000000000535",
                      },
                      group_operator: null,
                      group: null,
                    },
                  ],
                },
              ],
            },
            module: {
              api_name: "Deals",
              id: "554023000000000131",
            },
            type: "field_selection",
          },
        ],
        channel_id: "10000",
        events: ["Deals.edit", "Deals.create", "Deals.delete"],
        token: "deals.all.notif",
      },
    ],
    info: {
      per_page: 200,
      count: 3,
      page: 1,
      more_records: false,
    },
  },
};

export const enableNotificationExamplePayload = {
  data: {
    watch: [
      {
        code: "SUCCESS",
        details: {
          events: [
            {
              channel_expiry: "2023-08-02T16:59:50-11:00",
              resource_uri: "https://www.zohoapis.com/crm/v8/Deals",
              resource_id: "554023000000000131",
              resource_name: "Deals",
              channel_id: "10000",
            },
          ],
        },
        message: "Successfully subscribed for actions-watch of the given module",
        status: "success",
      },
    ],
  },
};

export const disableNotificationExamplePayload = {
  data: {
    watch: [
      {
        code: "SUCCESS",
        details: {
          resource_uri: "https://www.zohoapis.com/crm/v8/Contacts",
          resource_id: "554023000000000129",
          channel_id: "10000",
        },
        message: "Successfully un-subscribed from actions-watch",
        status: "success",
      },
      {
        code: "SUCCESS",
        details: {
          resource_uri: "https://www.zohoapis.com/crm/v8/Deals",
          resource_id: "554023000000000131",
          channel_id: "10000",
        },
        message: "Successfully un-subscribed from actions-watch",
        status: "success",
      },
    ],
  },
};

export const disableSpecificNotificationExamplePayload = {
  data: {
    watch: [
      {
        code: "SUCCESS",
        details: {
          events: [
            {
              resource_uri: "https://www.zohoapis.com/crm/v8/Contacts",
              resource_id: "554023000000000129",
              resource_name: "Contacts",
              channel_id: "10000",
            },
          ],
        },
        message: "Successfully removed the subscribe details",
        status: "success",
      },
    ],
  },
};

export const updateNotificationExamplePayload = {
  data: {
    watch: [
      {
        code: "SUCCESS",
        details: {
          events: [
            {
              channel_expiry: "2023-08-02T16:59:50-11:00",
              resource_uri: "https://www.zohoapis.com/crm/v8/Deals",
              resource_id: "554023000000000131",
              resource_name: "Deals",
              channel_id: "10000",
            },
          ],
        },
        message: "Successfully updated the subscribe details",
        status: "success",
      },
    ],
  },
};
