










export const listLocationsExamplePayload = {
  data: {
    locations: [
      {
        id: "L88917AVBK2S5",
        name: "Downtown Store",
        address: {
          address_line_1: "123 Main St",
          locality: "San Francisco",
          administrative_district_level_1: "CA",
          postal_code: "94103",
          country: "US",
        },
        timezone: "America/Los_Angeles",
        capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
        status: "ACTIVE",
        created_at: "2022-02-19T17:58:25Z",
        merchant_id: "ML82H4QPKMGXY",
        country: "US",
        language_code: "en-US",
        currency: "USD",
        phone_number: "+1 415-555-1234",
        business_name: "Example Business",
        type: "PHYSICAL",
        business_email: "hello@example.com",
      },
    ],
  },
};






export const retrieveLocationExamplePayload = {
  data: {
    location: {
      id: "L88917AVBK2S5",
      name: "Downtown Store",
      address: {
        address_line_1: "123 Main St",
        locality: "San Francisco",
        administrative_district_level_1: "CA",
        postal_code: "94103",
        country: "US",
      },
      timezone: "America/Los_Angeles",
      capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
      status: "ACTIVE",
      created_at: "2022-02-19T17:58:25Z",
      merchant_id: "ML82H4QPKMGXY",
      country: "US",
      language_code: "en-US",
      currency: "USD",
      phone_number: "+1 415-555-1234",
      business_name: "Example Business",
      type: "PHYSICAL",
      business_email: "hello@example.com",
      description: "Our main downtown location",
      business_hours: {
        periods: [
          {
            day_of_week: "MON",
            start_local_time: "09:00",
            end_local_time: "17:00",
          },
        ],
      },
    },
  },
};






export const updateLocationExamplePayload = {
  data: {
    location: {
      id: "L88917AVBK2S5",
      name: "Downtown Store - Updated",
      address: {
        address_line_1: "123 Main St",
        address_line_2: "Suite 200",
        locality: "San Francisco",
        administrative_district_level_1: "CA",
        postal_code: "94103",
        country: "US",
      },
      timezone: "America/Los_Angeles",
      capabilities: ["CREDIT_CARD_PROCESSING", "AUTOMATIC_TRANSFERS"],
      status: "ACTIVE",
      created_at: "2022-02-19T17:58:25Z",
      merchant_id: "ML82H4QPKMGXY",
      country: "US",
      language_code: "en-US",
      currency: "USD",
      phone_number: "+1 415-555-5678",
      business_name: "Example Business",
      type: "PHYSICAL",
      business_email: "hello@example.com",
      description: "Our updated main downtown location",
    },
  },
};
