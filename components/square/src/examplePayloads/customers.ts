










export const listCustomersExamplePayload = {
  data: {
    customers: [
      {
        id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
        created_at: "2016-03-23T20:21:54.859Z",
        updated_at: "2016-03-23T20:21:55Z",
        given_name: "Amelia",
        family_name: "Earhart",
        email_address: "amelia.earhart@example.com",
        address: {
          address_line_1: "500 Electric Ave",
          address_line_2: "Suite 600",
          locality: "New York",
          administrative_district_level_1: "NY",
          postal_code: "10003",
          country: "US",
        },
        phone_number: "+1-212-555-4240",
        reference_id: "YOUR_REFERENCE_ID",
        note: "a customer",
        preferences: {
          email_unsubscribed: false,
        },
        creation_source: "THIRD_PARTY",
        segment_ids: ["gv2:KF92J8MYVJ80E9B7HF1FAC6J1M"],
        version: 0,
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};






export const retrieveCustomerExamplePayload = {
  data: {
    customer: {
      id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
      created_at: "2016-03-23T20:21:54.859Z",
      updated_at: "2023-05-10T14:30:00Z",
      given_name: "Amelia",
      family_name: "Earhart",
      email_address: "amelia.earhart@example.com",
      address: {
        address_line_1: "500 Electric Ave",
        address_line_2: "Suite 600",
        locality: "New York",
        administrative_district_level_1: "NY",
        postal_code: "10003",
        country: "US",
      },
      phone_number: "+1-212-555-4240",
      reference_id: "YOUR_REFERENCE_ID",
      note: "a customer",
      birthday: "1897-07-24",
      preferences: {
        email_unsubscribed: false,
      },
      creation_source: "THIRD_PARTY",
      segment_ids: ["gv2:KF92J8MYVJ80E9B7HF1FAC6J1M"],
      version: 3,
    },
  },
};






export const createCustomerExamplePayload = {
  data: {
    customer: {
      id: "8DM2W1WQYG3VXFYGXVF9W9M8N3",
      created_at: "2023-05-15T10:00:00.000Z",
      updated_at: "2023-05-15T10:00:00.000Z",
      given_name: "Jane",
      family_name: "Smith",
      email_address: "jane.smith@example.com",
      phone_number: "+1-415-555-2671",
      address: {
        address_line_1: "123 Main St",
        locality: "San Francisco",
        administrative_district_level_1: "CA",
        postal_code: "94103",
        country: "US",
      },
      preferences: {
        email_unsubscribed: false,
      },
      creation_source: "THIRD_PARTY",
      version: 0,
    },
  },
};






export const updateCustomerExamplePayload = {
  data: {
    customer: {
      id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
      created_at: "2016-03-23T20:21:54.859Z",
      updated_at: "2023-05-16T11:22:33.000Z",
      given_name: "Amelia",
      family_name: "Earhart-Smith",
      email_address: "amelia.earhart@example.com",
      address: {
        address_line_1: "500 Electric Ave",
        address_line_2: "Suite 600",
        locality: "New York",
        administrative_district_level_1: "NY",
        postal_code: "10003",
        country: "US",
      },
      phone_number: "+1-212-555-4240",
      note: "Updated customer information",
      preferences: {
        email_unsubscribed: false,
      },
      version: 4,
    },
  },
};






export const searchCustomersExamplePayload = {
  data: {
    customers: [
      {
        id: "JDKYHBWT1D4F8MFH63DBMEN8Y4",
        created_at: "2016-03-23T20:21:54.859Z",
        updated_at: "2016-03-23T20:21:55Z",
        given_name: "Amelia",
        family_name: "Earhart",
        email_address: "amelia.earhart@example.com",
        preferences: {
          email_unsubscribed: false,
        },
        creation_source: "THIRD_PARTY",
        version: 0,
      },
    ],
    cursor: "MTY1Njk2OTU5NjEzMjAwMDAwMA==",
  },
};







export const deleteCustomerExamplePayload = {
  data: {},
};
