export const getVendorResponse = {
  code: "19566",
  created_at: "2019-08-28T14:15:22+00:00",
  id: "123",
  is_active: true,
  is_synced: true,
  name: "Amazon",
  ramp_id: "649b6731-33c6-4ff5-8a5d-2333fcc90ace",
  updated_at: "2020-08-28T14:40:12+00:00",
};

export const listVendorsResponse = {
  data: [
    getVendorResponse,
    {
      code: "19566",
      created_at: "2019-08-28T14:15:22+00:00",
      id: "123",
      is_active: true,
      is_synced: true,
      name: "Amazon",
      ramp_id: "649b6731-33c6-4ff5-8a5d-2333fcc90ace",
      updated_at: "2020-08-28T14:40:12+00:00",
    },
  ],
  page: {
    next: "https://api.ramp.com/developer/v1/<resources>?<new_params>",
  },
};
