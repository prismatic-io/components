export const selectLanguageExamplePayload = {
  result: [
    { label: "English (United States) (en-US)", key: "en-US" },
    { label: "Spanish (Spain) (es-ES)", key: "es-ES" },
  ],
};

export const selectTimezoneExamplePayload = {
  result: [
    {
      label: "(UTC-05:00) Eastern Time (US & Canada) (Eastern Standard Time)",
      key: "Eastern Standard Time",
    },
    {
      label: "(UTC-08:00) Pacific Time (US & Canada) (Pacific Standard Time)",
      key: "Pacific Standard Time",
    },
  ],
};

export const listSupportedLanguagesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.localeInfo)",
    value: [
      {
        locale: "en-US",
        displayName: "English (United States)",
      },
      {
        locale: "es-ES",
        displayName: "Spanish (Spain)",
      },
    ],
  },
};

export const listSupportedTimezonesExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#Collection(microsoft.graph.timeZoneInformation)",
    value: [
      {
        alias: "Eastern Standard Time",
        displayName: "(UTC-05:00) Eastern Time (US & Canada)",
      },
      {
        alias: "Pacific Standard Time",
        displayName: "(UTC-08:00) Pacific Time (US & Canada)",
      },
    ],
  },
};
