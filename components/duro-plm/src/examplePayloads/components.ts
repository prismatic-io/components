export const getComponentByIdExamplePayload = {
  data: {
    componentsByIds: [
      {
        id: "abcdef1234567890abcdef12",
        cpn: {
          displayValue: "123-45678",
        },
        created: "2024-06-14T14:58:29.791Z",
        category: "Integrated Circuit",
        archived: false,
        customSpecs: [
          {
            key: "Operating Voltage",
            specId: "abcdef1234567890abcdef01",
            value: "3.3V",
          },
        ],
        description:
          "A high-performance integrated circuit for advanced applications.",
        documentLinks: [
          {
            document: {
              src: "https://example.com/documents/ic_datasheet.pdf",
              name: "ic_datasheet.pdf",
              mime: "application/pdf",
              id: "abcdef1234567890abcdef23",
              archived: false,
              url: "https://example.com/documents/ic_datasheet.pdf",
            },
            specs: {
              status: "PRODUCTION",
              type: "DATASHEET",
              revision: "A",
              lastModified: "2024-06-14T14:58:30.229Z",
            },
          },
        ],
        eid: "20-4567-B2",
        family: "IC",
        images: [
          {
            mime: "JPEG",
            creator: {
              email: "john.doe@example.com",
            },
            name: "ic_image.jpg",
            src: "https://example.com/ic_image.jpg",
          },
        ],
        legacyCpn: "123-45678",
        lastModified: "2024-06-14T14:58:30.229Z",
        manufacturers: [
          {
            name: "IC Manufacturer Ltd.",
            description: "Manufacturer of integrated circuits.",
            mpn: {
              key: "MP1234",
              src: "https://example.com/parts/MP1234",
            },
          },
        ],
        name: "High-Performance IC",
        primarySource: {
          dpn: "DP1234",
          distributor: "Distributor Inc.",
          manufacturer: "IC Manufacturer Ltd.",
          minQuantity: 10,
          mpn: "MP1234",
          unitPrice: 5.99,
        },
        specs: [
          {
            key: "Package",
            value: "QFN-32",
          },
        ],
        status: "PRODUCTION",
        revisionValue: "1",
        workflowState: "Approved",
        vendorId: "V1234",
        creator: {
          id: "1234567890abcdef12345678",
          email: "john.doe@example.com",
          firstName: "John",
          lastName: "Doe",
        },
        revisionHistory: [
          {
            id: "abcdef1234567890abcdef34",
            cpn: {
              displayValue: "123-45678",
            },
            revisionValue: "1",
          },
        ],
        children: [
          {
            component: {
              id: "abcdef1234567890abcdef56",
            },
          },
          {
            component: {
              id: "abcdef1234567890abcdef78",
            },
          },
        ],
        modified: false,
        imageIds: ["abcdef1234567890abcdef90"],
      },
    ],
  },
};

export const listComponentsExamplePayload = {
  data: [
    {
      id: "666c5a8828e82100081595b0",
      name: 'CONN HEADER 10POS DUAL .05", Keying Shroud, SMD',
      mass: null,
      created: "2024-06-14T14:58:16.638Z",
      lastModified: "2024-06-14T14:58:18.069Z",
    },
  ],
};

export const selectComponentExamplePayload = {
  result: [
    {
      key: "666c5a8828e82100081595b0",
      label: 'CONN HEADER 10POS DUAL .05", Keying Shroud, SMD',
    },
    { key: "666c5a9528e821000815990e", label: "Precision Resistor 10k" },
  ],
};
