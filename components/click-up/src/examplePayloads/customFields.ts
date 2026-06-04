











export const getAccessibleCustomFieldsExamplePayload = {
  data: {
    fields: [
      {
        id: "0a52c486-7f05-403c-b4b0-2a1f6dd4b840",
        name: "Sprint",
        type: "drop_down",
        type_config: {
          default: 0,
          placeholder: null,
          options: [
            {
              id: "4aa3b3f7-1a02-4e57-a8cc-0ef8b1a9e07d",
              name: "Sprint 1",
              color: "#04a9f4",
              orderindex: 0,
            },
            {
              id: "5bb4c4g8-2b13-5f68-b9dd-1fg9c2b0f18e",
              name: "Sprint 2",
              color: "#ff7043",
              orderindex: 1,
            },
          ],
        },
        date_created: "1704067200000",
        hide_from_guests: false,
        required: false,
      },
      {
        id: "1b63d597-8g16-514d-c5c1-3b2g7ee5c951",
        name: "Story Points",
        type: "number",
        type_config: {},
        date_created: "1704067200000",
        hide_from_guests: false,
        required: false,
      },
    ],
  },
};

export const setCustomFieldValueExamplePayload = {
  data: null,
};

export const removeCustomFieldValueExamplePayload = {
  data: null,
};
