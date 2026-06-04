export const getGeneralLedgerAccountResponse = {
  classification: "EXPENSE",
  code: "6410",
  created_at: "2019-08-28T14:15:22+00:00",
  id: "514",
  is_active: true,
  name: "Employees:Salaries & Wages",
  ramp_id: "46910cc3-ab41-4b80-b4a7-94dab9f1b795",
  updated_at: "2020-08-28T14:40:12+00:00",
};

export const listGeneralLedgerAccountsResponse = {
  data: [
    getGeneralLedgerAccountResponse,
    {
      classification: "EXPENSE",
      code: "6410",
      created_at: "2019-08-28T14:15:22+00:00",
      id: "514",
      is_active: true,
      name: "Employees:Salaries & Wages",
      ramp_id: "46910cc3-ab41-4b80-b4a7-94dab9f1b795",
      updated_at: "2020-08-28T14:40:12+00:00",
    },
  ],
  page: {
    next: "https://api.ramp.com/developer/v1/<resources>?<new_params>",
  },
};
