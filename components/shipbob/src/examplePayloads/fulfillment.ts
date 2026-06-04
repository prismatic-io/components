








export const listFulfillmentCentersExamplePayload = {
  data: [
    {
      id: 5,
      name: "Cicero (IL)",
      address1: "4415 S Sacramento Ave",
      address2: null,
      city: "Chicago",
      state: "IL",
      zip_code: "60632",
      country: "US",
      email: "cicero-fc@shipbob.com",
      phone_number: "+13125551234",
      timezone: "America/Chicago",
    },
  ],
};

export const listLocationsExamplePayload = {
  data: [
    {
      id: 5,
      name: "Cicero (IL)",
      abbreviation: "ORD1",
      is_active: true,
      is_receiving_enabled: true,
      is_shipping_enabled: true,
      access_granted: true,
      timezone: "America/Chicago",
      region: {
        id: 1,
        name: "United States",
      },
      services: [
        {
          service_type: "Receiving",
          enabled: true,
          address: {
            address1: "4415 S Sacramento Ave",
            address2: null,
            city: "Chicago",
            state: "IL",
            country: "US",
            zip_code: "60632",
            phone_number: "+13125551234",
            email: "cicero-fc@shipbob.com",
            name: "Cicero (IL)",
          },
        },
      ],
      attributes: [],
    },
  ],
};
