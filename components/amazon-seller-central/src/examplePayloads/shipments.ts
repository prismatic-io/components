export const createShipmentExamplePayload = {
  data: {
    Shipment: {
      ShipmentId: "MWSTestShipment123456789",
      AmazonOrderId: "902-3159896-1390916",
      SellerOrderId: "MY-ORDER-123",
      ItemList: [
        {
          OrderItemId: "52852651034158",
          Quantity: 1,
        },
      ],
      ShipFromAddress: {
        Name: "ACME Warehouse",
        AddressLine1: "456 ACME Blvd",
        AddressLine2: "Suite 200",
        City: "Seattle",
        StateOrProvinceCode: "WA",
        PostalCode: "98101",
        CountryCode: "US",
        Email: "warehouse@example.com",
        Phone: "555-987-6543",
      },
      ShipToAddress: {
        Name: "John Doe",
        AddressLine1: "123 Main Street",
        AddressLine2: "Apt 4B",
        City: "Seattle",
        StateOrProvinceCode: "WA",
        PostalCode: "98101",
        CountryCode: "US",
        Email: null,
        Phone: "555-123-4567",
      },
      PackageDimensions: {
        Length: 10.0,
        Width: 8.0,
        Height: 6.0,
        Unit: "inches",
        PredefinedPackageDimensions: "FedEx_Box_10kg",
      },
      Weight: {
        Value: 2.5,
        Unit: "pounds",
      },
      Insurance: {
        Amount: {
          CurrencyCode: "USD",
          Amount: 0.0,
        },
      },
      ShippingService: {
        ShippingServiceName: "USPS Priority Mail",
        CarrierName: "USPS",
        ShippingServiceId: "usps-priority-mail",
        ShippingServiceOfferId: "offer123456",
        ShipDate: "2024-01-15T08:00:00Z",
        EarliestEstimatedDeliveryDate: "2024-01-17T08:00:00Z",
        LatestEstimatedDeliveryDate: "2024-01-19T20:00:00Z",
        Rate: {
          CurrencyCode: "USD",
          Amount: 7.5,
        },
        ShippingServiceOptions: {
          DeliveryExperience: "DeliveryConfirmationWithSignature",
          DeclaredValue: {
            CurrencyCode: "USD",
            Amount: 99.99,
          },
          CarrierWillPickUp: false,
          CarrierWillPickUpOption: null,
          LabelFormat: "PNG",
        },
        AvailableLabelFormats: ["PNG", "PDF"],
        AvailableFormatOptionsForLabel: [
          {
            IncludePackingSlipWithLabel: false,
          },
        ],
        RequiresAdditionalSellerInputs: false,
      },
      Label: {
        CustomTextForLabel: null,
        Dimensions: {
          Length: 4.0,
          Width: 6.0,
          Unit: "inches",
        },
        FileContents: {
          Contents:
            "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwo+Pg==",
          FileType: "application/pdf",
          Checksum: "5d41402abc4b2a76b9719d911017c592",
        },
        LabelFormat: "PDF",
        StandardIdForLabel: "AmazonOrderId",
      },
      TrackingId: "1234567890123456789012",
      Status: "Purchased",
      CreatedDate: "2024-01-15T10:30:45.123Z",
      LastUpdatedDate: "2024-01-15T10:30:45.123Z",
    },
  },
};

export const getShipmentExamplePayload = {
  data: {
    Shipment: {
      ShipmentId: "MWSTestShipment123456789",
      AmazonOrderId: "902-3159896-1390916",
      SellerOrderId: "MY-ORDER-123",
      ItemList: [
        {
          OrderItemId: "52852651034158",
          Quantity: 1,
        },
      ],
      ShipFromAddress: {
        Name: "ACME Warehouse",
        AddressLine1: "456 ACME Blvd",
        AddressLine2: "Suite 200",
        City: "Seattle",
        StateOrProvinceCode: "WA",
        PostalCode: "98101",
        CountryCode: "US",
        Email: "warehouse@example.com",
        Phone: "555-987-6543",
      },
      ShipToAddress: {
        Name: "John Doe",
        AddressLine1: "123 Main Street",
        AddressLine2: "Apt 4B",
        City: "Seattle",
        StateOrProvinceCode: "WA",
        PostalCode: "98101",
        CountryCode: "US",
        Email: null,
        Phone: "555-123-4567",
      },
      PackageDimensions: {
        Length: 10.0,
        Width: 8.0,
        Height: 6.0,
        Unit: "inches",
        PredefinedPackageDimensions: "FedEx_Box_10kg",
      },
      Weight: {
        Value: 2.5,
        Unit: "pounds",
      },
      Insurance: {
        Amount: {
          CurrencyCode: "USD",
          Amount: 0.0,
        },
      },
      ShippingService: {
        ShippingServiceName: "USPS Priority Mail",
        CarrierName: "USPS",
        ShippingServiceId: "usps-priority-mail",
        ShippingServiceOfferId: "offer123456",
        ShipDate: "2024-01-15T08:00:00Z",
        EarliestEstimatedDeliveryDate: "2024-01-17T08:00:00Z",
        LatestEstimatedDeliveryDate: "2024-01-19T20:00:00Z",
        Rate: {
          CurrencyCode: "USD",
          Amount: 7.5,
        },
        ShippingServiceOptions: {
          DeliveryExperience: "DeliveryConfirmationWithSignature",
          DeclaredValue: {
            CurrencyCode: "USD",
            Amount: 99.99,
          },
          CarrierWillPickUp: false,
          CarrierWillPickUpOption: null,
          LabelFormat: "PDF",
        },
        AvailableLabelFormats: ["PNG", "PDF"],
        AvailableFormatOptionsForLabel: [
          {
            IncludePackingSlipWithLabel: false,
          },
        ],
        RequiresAdditionalSellerInputs: false,
      },
      Label: {
        CustomTextForLabel: null,
        Dimensions: {
          Length: 4.0,
          Width: 6.0,
          Unit: "inches",
        },
        FileContents: {
          Contents:
            "JVBERi0xLjQKJeLjz9MKMSAwIG9iago8PAovVHlwZSAvQ2F0YWxvZwo+Pg==",
          FileType: "application/pdf",
          Checksum: "5d41402abc4b2a76b9719d911017c592",
        },
        LabelFormat: "PDF",
        StandardIdForLabel: "AmazonOrderId",
      },
      TrackingId: "1234567890123456789012",
      Status: "Purchased",
      CreatedDate: "2024-01-15T10:30:45.123Z",
      LastUpdatedDate: "2024-01-15T10:30:45.123Z",
    },
  },
};

export const cancelShipmentExamplePayload = {
  data: {
    Shipment: {
      ShipmentId: "MWSTestShipment123456789",
      AmazonOrderId: "902-3159896-1390916",
      Status: "Cancelled",
      CreatedDate: "2024-01-15T10:30:45.123Z",
      LastUpdatedDate: "2024-01-15T11:15:30.456Z",
    },
  },
};
