





export const getCustomerExamplePayload = {
  data: {
    customerId: 12345678,
    createDate: "2014-11-18T10:33:01.1900000",
    modifyDate: "2014-11-18T10:33:01.1900000",
    name: "Cam Newton",
    company: "Test Company",
    street1: "123 War Eagle Lane",
    street2: "",
    city: "Auburn",
    state: "AL",
    postalCode: "36830",
    countryCode: "US",
    phone: "555-555-5555",
    email: "camn1@example.com",
    addressVerified: "Verified",
    marketplaceUsernames: [
      {
        customerUserId: 67195020,
        customerId: 12345678,
        createDate: "2015-04-27T12:35:03.8300000",
        modifyDate: "2015-05-14T08:16:15.2700000",
        marketplaceId: 0,
        marketplace: "ShipStation",
        username: "camn1@example.com",
      },
      {
        customerUserId: 37568588,
        customerId: 12345678,
        createDate: "2014-11-18T10:33:01.1970000",
        modifyDate: "2014-11-18T10:33:01.1970000",
        marketplaceId: 36,
        marketplace: "WooCommerce",
        username: "camn1@example.com",
      },
    ],
    tags: [
      { tagId: 1234, name: "Expedited" },
      { tagId: 9725, name: "00 BULK ORDERED" },
    ],
  },
};







export const listCustomersExamplePayload = {
  data: {
    customers: [getCustomerExamplePayload.data],
    total: 1,
    page: 1,
    pages: 1,
  },
};
