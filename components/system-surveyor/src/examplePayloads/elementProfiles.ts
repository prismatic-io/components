



export const listElementProfilesExamplePayload = {
  data: {
    count: 23,
    ep_accessories: [
      {
        id: 0,
        team_id: 0,
        element_id: 0,
        description: "Accessory 1",
        manufacturer: "string",
        model: "string",
        price: 0.1,
        labor_hours: 0.1,
        created_at: 0,
      },
    ],
  },
};

export const getElementProfileAccessoriesExamplePayload = {
  data: [
    {
      id: 45,
      team_id: 454,
      element_id: 12,
      description: "Accessory 1",
      manufacturer: "Acme Corp",
      model: "ACM-2000",
      price: 34.55,
      labor_hours: 3.5,
      created_at: 1714764800,
    },
  ],
};

export const syncElementProfileExamplePayload = {
  data: {
    id: 9045,
    name: "Express Operational Test Kit (OTK)",
    is_default: true,
    sort: 0,
    created_by: 4500,
    team_id: 4955,
    element_id: 412,
    created_at: 1714764800,
    modified_at: 1714851200,
    content: {
      attribute: [{ attribute_id: 455, value: "49494A" }],
    },
    accessories: [
      {
        id: 45,
        team_id: 454,
        element_id: 12,
        description: "Accessory 1",
        manufacturer: "Acme Corp",
        model: "ACM-2000",
        price: 34.55,
        labor_hours: 3.5,
        created_at: 1714764800,
      },
    ],
  },
};
