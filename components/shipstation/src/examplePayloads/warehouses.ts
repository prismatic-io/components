





export const getWarehouseExamplePayload = {
  data: {
    warehouseId: 12345,
    warehouseName: "API Ship From Location",
    originAddress: {
      name: "API Warehouse",
      company: "ShipStation",
      street1: "2815 Exposition Blvd",
      street2: null,
      street3: null,
      city: "Austin",
      state: "TX",
      postalCode: "78703",
      country: "US",
      phone: "512-555-5555",
      residential: true,
      addressVerified: null,
    },
    returnAddress: {
      name: "API Ship From Location",
      company: "ShipStation",
      street1: "2815 Exposition Blvd",
      street2: null,
      street3: null,
      city: "Austin",
      state: "TX",
      postalCode: "78703",
      country: "US",
      phone: "512-555-5555",
      residential: null,
      addressVerified: null,
    },
    createDate: "2015-07-02T08:38:31.4870000",
    isDefault: true,
  },
};







export const updateWarehouseExamplePayload = getWarehouseExamplePayload;







export const listWarehousesExamplePayload = {
  data: [
    {
      warehouseId: 17977,
      warehouseName: "Main warehouse",
      originAddress: {
        name: "Spring warehouse",
        company: "",
        street1: "123 S SPRING RD",
        street2: "",
        street3: "",
        city: "Elmhurst",
        state: "IL",
        postalCode: "60126",
        country: "US",
        phone: "5121112222",
        residential: false,
      },
      returnAddress: {
        name: "Chicago House",
        company: "",
        street1: "123 S SPRING RD",
        street2: "",
        street3: "",
        city: "Elmhurst",
        state: "IL",
        postalCode: "60126",
        country: "US",
        phone: "5121112222",
        residential: null,
      },
      createDate: "2014-10-21T08:11:43.8800000",
      isDefault: true,
    },
    {
      warehouseId: 14265,
      warehouseName: "Austin",
      originAddress: {
        name: "Austin",
        company: "ShipStation",
        street1: "2815 Exposition Blvd",
        street2: "",
        street3: "",
        city: "Austin",
        state: "TX",
        postalCode: "78703",
        country: "US",
        phone: "5124445555",
        residential: false,
      },
      returnAddress: {
        name: "ShipStation",
        company: "ShipStation",
        street1: "2815 Exposition Blvd",
        street2: "",
        street3: "",
        city: "Austin",
        state: "TX",
        postalCode: "78703",
        country: "US",
        phone: "5124445555",
        residential: null,
      },
      createDate: "2014-05-27T09:54:29.9600000",
      isDefault: false,
    },
  ],
};







export const createWarehouseExamplePayload = {
  data: {
    warehouseId: 17977,
    warehouseName: "New Ship From Location",
    originAddress: {
      name: "NM Warehouse",
      company: "White Sands Co",
      street1: "4704 Arabela Dr.",
      street2: "",
      street3: "",
      city: "Las Cruces",
      state: "NM",
      postalCode: "88012",
      country: "US",
      phone: "512-111-2222",
      residential: true,
    },
    returnAddress: {
      name: "NM Warehouse",
      company: "White Sands Co",
      street1: "4704 Arabela Dr.",
      street2: "",
      street3: "",
      city: "Las Cruces",
      state: "NM",
      postalCode: "88012",
      country: "US",
      phone: "512-111-2222",
      residential: null,
    },
    createDate: "2014-10-21T08:11:43.8800000",
    isDefault: false,
  },
};







export const deleteWarehouseExamplePayload = {
  data: {
    success: true,
    message: "The requested warehouse has been deleted.",
  },
};
