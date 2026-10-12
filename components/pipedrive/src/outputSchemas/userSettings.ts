export const getUserSettingsOutputSchema = {
  type: "object",
  properties: {
    data: {
      type: "object",
      properties: {
        success: { type: "boolean" },
        data: {
          type: "object",
          properties: {
            marketplace_allow_install_from: { type: "string" },
            default_currency: { type: "string" },
            list_limit: { type: "integer" },
            locale: { type: "string" },
            format_currency_decimal_separator: { type: "string" },
            format_currency_thousands_separator: { type: "string" },
            format_date: { type: "string" },
            format_time: { type: "string" },
            show_getting_started_video: { type: "boolean" },
            timezone: { type: "string" },
          },
        },
      },
    },
  },
};
