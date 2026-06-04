








export const listBasesExamplePayload = {
  data: [
    {
      id: "appLkNDICXNqxSDhG",
      name: "Apartment Hunting",
      permissionLevel: "create",
    },
    {
      id: "appSW9R5uCNmRmfl6",
      name: "Project Tracker",
      permissionLevel: "edit",
    },
    {
      id: "appVZ3mDrP8fK4xyL",
      name: "Marketing Campaigns",
      permissionLevel: "read",
    },
  ],
};






export const getBaseSchemaExamplePayload = {
  data: {
    tables: [
      {
        description: "Apartments to track.",
        fields: [
          {
            description: "Name of the apartment",
            id: "fld1VnoyuotSTyxW1",
            name: "Name",
            type: "singleLineText",
          },
          {
            id: "fldoaIqdn5szURHpw",
            name: "Pictures",
            type: "multipleAttachments",
          },
          {
            id: "fldumZe00w09RYTW6",
            name: "District",
            options: {
              inverseLinkFieldId: "fldWnCJlo2z6ttT8Y",
              isReversed: false,
              linkedTableId: "tblK6MZHez0ZvBChZ",
              prefersSingleRecordLink: true,
            },
            type: "multipleRecordLinks",
          },
          {
            id: "fldPrQNxGqKXLbR4w",
            name: "Price",
            type: "currency",
            options: {
              precision: 2,
              symbol: "$",
            },
          },
        ],
        id: "tbltp8DGLhqbUmjK1",
        name: "Apartments",
        primaryFieldId: "fld1VnoyuotSTyxW1",
        views: [
          {
            id: "viwQpsuEDqHFqegkp",
            name: "Grid view",
            type: "grid",
          },
          {
            id: "viwKLb2UxT9mQpP4d",
            name: "Gallery view",
            type: "gallery",
          },
        ],
      },
      {
        fields: [
          {
            id: "fldEVzvQOoULO38yl",
            name: "Name",
            type: "singleLineText",
          },
          {
            description: "Apartments that belong to this district",
            id: "fldWnCJlo2z6ttT8Y",
            name: "Apartments",
            options: {
              inverseLinkFieldId: "fldumZe00w09RYTW6",
              isReversed: false,
              linkedTableId: "tbltp8DGLhqbUmjK1",
              prefersSingleRecordLink: false,
            },
            type: "multipleRecordLinks",
          },
        ],
        id: "tblK6MZHez0ZvBChZ",
        name: "Districts",
        primaryFieldId: "fldEVzvQOoULO38yl",
        views: [
          {
            id: "viwi3KXvrKug2mIBS",
            name: "Grid view",
            type: "grid",
          },
        ],
      },
    ],
  },
};
