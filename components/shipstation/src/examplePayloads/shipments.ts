





export const listShipmentsExamplePayload = {
  data: {
    shipments: [
      {
        shipmentId: 33974374,
        orderId: 43945660,
        orderKey: "8061c220f0794a9b92460b8bae6837e4",
        userId: "123456AB-ab12-3c4d-5e67-89f1abc1defa",
        orderNumber: "100038-1",
        createDate: "2014-10-03T06:51:33.6270000",
        shipDate: "2014-10-03",
        shipmentCost: 1.93,
        insuranceCost: 0,
        trackingNumber: "9400111899561704681189",
        isReturnLabel: false,
        batchNumber: "100301",
        carrierCode: "stamps_com",
        serviceCode: "usps_first_class_mail",
        packageCode: "package",
        confirmation: "delivery",
        warehouseId: 16079,
        voided: false,
        voidDate: null,
        marketplaceNotified: true,
        notifyErrorMessage: null,
        shipTo: {
          name: "Yoda",
          company: "",
          street1: "12223 LOWDEN LN",
          street2: "",
          street3: null,
          city: "MANCHACA",
          state: "TX",
          postalCode: "78652-3602",
          country: "US",
          phone: "2101235544",
          residential: null,
        },
        weight: { value: 1, units: "ounces" },
        dimensions: null,
        insuranceOptions: {
          provider: null,
          insureShipment: false,
          insuredValue: 0,
        },
        advancedOptions: null,
        shipmentItems: [
          {
            orderItemId: 56568665,
            lineItemKey: null,
            sku: "SQ3785739",
            name: "Potato Kitten -",
            imageUrl: null,
            weight: null,
            quantity: 1,
            unitPrice: 1,
            warehouseLocation: null,
            options: null,
            productId: 7565777,
            fulfillmentSku: null,
          },
        ],
        labelData: null,
        formData: null,
      },
    ],
    total: 1,
    page: 1,
    pages: 1,
  },
};







export const createShipmentLabelExamplePayload = {
  data: {
    shipmentId: 123456789,
    orderId: null,
    userId: null,
    customerEmail: null,
    orderNumber: null,
    createDate: "2016-04-03T12:11:36.8630000",
    shipDate: "2016-04-03",
    shipmentCost: 9.06,
    insuranceCost: 0,
    trackingNumber: "782390443992",
    isReturnLabel: false,
    batchNumber: null,
    carrierCode: "fedex",
    serviceCode: "fedex_ground",
    packageCode: "package",
    confirmation: "delivery",
    warehouseId: null,
    voided: false,
    voidDate: null,
    marketplaceNotified: false,
    notifyErrorMessage: null,
    shipTo: null,
    weight: null,
    dimensions: null,
    insuranceOptions: null,
    advancedOptions: null,
    shipmentItems: null,
    labelData: "JVBERi0xLjQKJeLjz9MKMiAwIG9iago...",
    formData: null,
  },
};







export const listCarriersExamplePayload = {
  data: [
    {
      name: "Stamps.com",
      code: "stamps_com",
      accountNumber: "SS123",
      requiresFundedAccount: true,
      balance: 24.27,
      nickname: null,
      shippingProviderId: 12345,
      primary: true,
    },
    {
      name: "FedEx",
      code: "fedex",
      accountNumber: "297929999",
      requiresFundedAccount: false,
      balance: 0,
      nickname: "SS",
      shippingProviderId: 12348,
      primary: true,
    },
  ],
};







export const listServicesExamplePayload = {
  data: [
    {
      carrierCode: "fedex",
      code: "fedex_ground",
      name: "FedEx Ground\u00ae",
      domestic: true,
      international: false,
    },
    {
      carrierCode: "fedex",
      code: "fedex_home_delivery",
      name: "FedEx Home Delivery\u00ae",
      domestic: true,
      international: false,
    },
    {
      carrierCode: "fedex",
      code: "fedex_2day",
      name: "FedEx 2Day\u00ae",
      domestic: true,
      international: false,
    },
  ],
};







export const listPackagesExamplePayload = {
  data: [
    {
      carrierCode: "express_1",
      code: "flat_rate_envelope",
      name: "Flat Rate Envelope",
      domestic: true,
      international: true,
    },
    {
      carrierCode: "express_1",
      code: "large_flat_rate_box",
      name: "Large Flat Rate Box",
      domestic: true,
      international: true,
    },
    {
      carrierCode: "express_1",
      code: "package",
      name: "Package",
      domestic: true,
      international: true,
    },
  ],
};
