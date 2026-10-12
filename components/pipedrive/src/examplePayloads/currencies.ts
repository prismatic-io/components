export const getCurrenciesExamplePayload = {
  data: {
    success: true,
    data: [
      {
        id: 1,
        code: "USD",
        name: "US Dollar",
        decimal_points: 2,
        symbol: "$",
        active_flag: true,
        is_custom_flag: false,
      },
      {
        id: 2,
        code: "EUR",
        name: "Euro",
        decimal_points: 2,
        symbol: "\u20AC",
        active_flag: true,
        is_custom_flag: false,
      },
      {
        id: 3,
        code: "GBP",
        name: "British Pound",
        decimal_points: 2,
        symbol: "\u00A3",
        active_flag: true,
        is_custom_flag: false,
      },
    ],
  },
};
