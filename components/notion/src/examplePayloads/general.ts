export const createDatabaseParent = {
  type: "page_id",
  page_id: "d9824bdc84454327be8b5b47500af6ce",
};

export const createDatabasePayload = {
  Name: {
    title: {},
  },
  Description: {
    rich_text: {},
  },
  "In stock": {
    checkbox: {},
  },
  "Food group": {
    select: {
      options: [
        {
          name: "Vegetable",
          color: "green",
        },
        {
          name: "Fruit",
          color: "red",
        },
        {
          name: "Protein",
          color: "yellow",
        },
      ],
    },
  },
  Price: {
    number: {
      format: "dollar",
    },
  },
  "Last ordered": {
    date: {},
  },
  Meals: {
    relation: {
      data_source_id: "668d797c-76fa-4934-9b05-ad288df2d136",
      single_property: {},
    },
  },
  "Number of meals": {
    rollup: {
      rollup_property_name: "Name",
      relation_property_name: "Meals",
      function: "count",
    },
  },
  "Store availability": {
    type: "multi_select",
    multi_select: {
      options: [
        {
          name: "Duc Loi Market",
          color: "blue",
        },
        {
          name: "Rainbow Grocery",
          color: "gray",
        },
        {
          name: "Nijiya Market",
          color: "purple",
        },
        {
          name: "Gus's Community Market",
          color: "yellow",
        },
      ],
    },
  },
  "+1": {
    people: {},
  },
  Photo: {
    files: {},
  },
};

export const createDatabaseResponse = {
  data: {
    object: "database",
    id: "bc1211ca-e3f1-4939-ae34-5260b16f627c",
    created_time: "2021-07-08T23:50:00.000Z",
    last_edited_time: "2021-07-08T23:50:00.000Z",
    icon: {
      type: "emoji",
      emoji: "🎉",
    },
    cover: {
      type: "external",
      external: {
        url: "https://website.domain/images/image.png",
      },
    },
    url: "https://www.notion.so/bc1211cae3f14939ae34260b16f627c",
    title: [
      {
        type: "text",
        text: {
          content: "Grocery List",
          link: null,
        },
        annotations: {
          bold: false,
          italic: false,
          strikethrough: false,
          underline: false,
          code: false,
          color: "default",
        },
        plain_text: "Grocery List",
        href: null,
      },
    ],
    properties: {
      "+1": {
        id: "Wp%3DC",
        name: "+1",
        type: "people",
        people: {},
      },
      "In stock": {
        id: "fk%5EY",
        name: "In stock",
        type: "checkbox",
        checkbox: {},
      },
      Price: {
        id: "evWq",
        name: "Price",
        type: "number",
        number: {
          format: "dollar",
        },
      },
      Description: {
        id: "V}lX",
        name: "Description",
        type: "rich_text",
        rich_text: {},
      },
      "Last ordered": {
        id: "eVnV",
        name: "Last ordered",
        type: "date",
        date: {},
      },
      Meals: {
        id: "%7DWA~",
        name: "Meals",
        type: "relation",
        relation: {
          data_source_id: "668d797c-76fa-4934-9b05-ad288df2d136",
          single_property: {},
        },
      },
      "Number of meals": {
        id: "Z\\Eh",
        name: "Number of meals",
        type: "rollup",
        rollup: {
          rollup_property_name: "Name",
          relation_property_name: "Meals",
          rollup_property_id: "title",
          relation_property_id: "mxp^",
          function: "count",
        },
      },
      "Store availability": {
        id: "s}Kq",
        name: "Store availability",
        type: "multi_select",
        multi_select: {
          options: [
            {
              id: "cb79b393-d1c1-4528-b517-c450859de766",
              name: "Duc Loi Market",
              color: "blue",
            },
            {
              id: "58aae162-75d4-403b-a793-3bc7308e4cd2",
              name: "Rainbow Grocery",
              color: "gray",
            },
            {
              id: "22d0f199-babc-44ff-bd80-a9eae3e3fcbf",
              name: "Nijiya Market",
              color: "purple",
            },
            {
              id: "0d069987-ffb0-4347-bde2-8e4068003dbc",
              name: "Gus's Community Market",
              color: "yellow",
            },
          ],
        },
      },
      Photo: {
        id: "yfiK",
        name: "Photo",
        type: "files",
        files: {},
      },
      "Food group": {
        id: "CM%3EH",
        name: "Food group",
        type: "select",
        select: {
          options: [
            {
              id: "6d4523fa-88cb-4ffd-9364-1e39d0f4e566",
              name: "Vegetable",
              color: "green",
            },
            {
              id: "268d7e75-de8f-4c4b-8b9d-de0f97021833",
              name: "Fruit",
              color: "red",
            },
            {
              id: "1b234a00-dc97-489c-b987-829264cfdfef",
              name: "Protein",
              color: "yellow",
            },
          ],
        },
      },
      Name: {
        id: "title",
        name: "Name",
        type: "title",
        title: {},
      },
    },
    parent: {
      type: "page_id",
      page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
    },
    archived: false,
  },
};

export const listPagesResponse = {
  data: {
    object: "list",
    results: [
      {
        object: "page",
        id: "59833787-2cf9-4fdf-8782-e53db20768a5",
        created_time: "2022-03-01T19:05:00.000Z",
        last_edited_time: "2022-07-06T19:16:00.000Z",
        created_by: {
          object: "user",
          id: "ee5f0f84-409a-440f-983a-a5315961c6e4",
        },
        last_edited_by: {
          object: "user",
          id: "ee5f0f84-409a-440f-983a-a5315961c6e4",
        },
        parent: {
          type: "data_source_id",
          data_source_id: "d9824bdc-8445-4327-be8b-5b47500af6ce",
        },
        archived: false,
        properties: {
          Name: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: "Sample Page",
                  link: null,
                },
                plain_text: "Sample Page",
              },
            ],
          },
        },
        url: "https://www.notion.so/Sample-Page-598337872cf94fdf8782e53db20768a5",
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "page",
  },
};

export const createPageResponse = {
  data: {
    object: "page",
    id: "59833787-2cf9-4fdf-8782-e53db20768a5",
    created_time: "2022-03-01T19:05:00.000Z",
    last_edited_time: "2022-07-06T19:16:00.000Z",
    created_by: {
      object: "user",
      id: "ee5f0f84-409a-440f-983a-a5315961c6e4",
    },
    last_edited_by: {
      object: "user",
      id: "ee5f0f84-409a-440f-983a-a5315961c6e4",
    },
    cover: {
      type: "external",
      external: {
        url: "https://upload.wikimedia.org/wikipedia/commons/6/62/Tuscankale.jpg",
      },
    },
    icon: {
      type: "emoji",
      emoji: "🥬",
    },
    parent: {
      type: "data_source_id",
      data_source_id: "d9824bdc-8445-4327-be8b-5b47500af6ce",
    },
    archived: false,
    properties: {
      "Store availability": {
        id: "%3AUPp",
      },
      "Food group": {
        id: "A%40Hk",
      },
      Price: {
        id: "BJXS",
      },
      "Responsible Person": {
        id: "Iowm",
      },
      "Last ordered": {
        id: "Jsfb",
      },
      "Cost of next trip": {
        id: "WOd%3B",
      },
      Recipes: {
        id: "YfIu",
      },
      Description: {
        id: "_Tc_",
      },
      "In stock": {
        id: "%60%5Bq%3F",
      },
      "Number of meals": {
        id: "zag~",
      },
      Photo: {
        id: "%7DF_L",
      },
      Name: {
        id: "title",
      },
    },
    url: "https://www.notion.so/Tuscan-Kale-598337872cf94fdf8782e53db20768a5",
  },
};

export const propertiesInputsExample = {
  Name: {
    title: {},
  },
  Description: {
    rich_text: {},
  },
};

export const sortInputExample = [
  {
    property: "Last ordered",
    direction: "ascending",
  },
];

export const descriptionInputExample = [
  {
    annotations: {
      bold: false,
      italic: false,
      strikethrough: false,
      underline: false,
      code: false,
      color: '"default"',
    },
  },
];



export const getUserResponse = {
  data: {
    object: "user",
    id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    type: "person",
    person: {
      email: "john.doe@example.com",
    },
    name: "John Doe",
    avatar_url: "https://secure.notion-static.com/avatar.jpg",
  },
};

export const getCurrentUserResponse = getUserResponse;

export const listUsersResponse = {
  data: {
    object: "list",
    results: [
      {
        object: "user",
        id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
        type: "person",
        person: {
          email: "john.doe@example.com",
        },
        name: "John Doe",
        avatar_url: "https://secure.notion-static.com/avatar-1.jpg",
      },
      {
        object: "user",
        id: "ee5f0f84-409a-440f-983a-a5315961c6e4",
        type: "bot",
        bot: {
          owner: {
            type: "workspace",
            workspace: true,
          },
          workspace_name: "Example Workspace",
        },
        name: "Integration Bot",
        avatar_url: "https://secure.notion-static.com/avatar-2.jpg",
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "user",
  },
};


export const rawRequestResponse = {
  data: {
    object: "user",
    id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    type: "person",
    person: {
      email: "john.doe@example.com",
    },
    name: "John Doe",
    avatar_url: "https://secure.notion-static.com/avatar.jpg",
  },
};



export const getDatabaseResponse = {
  data: {
    object: "database",
    id: "bc1211ca-e3f1-4939-ae34-5260b16f627c",
    created_time: "2021-07-08T23:50:00.000Z",
    last_edited_time: "2021-07-08T23:50:00.000Z",
    title: [
      {
        type: "text",
        text: {
          content: "Grocery List",
          link: null,
        },
        plain_text: "Grocery List",
      },
    ],
    properties: {
      Name: {
        id: "title",
        type: "title",
        title: {},
      },
      Description: {
        id: "V}lX",
        type: "rich_text",
        rich_text: {},
      },
    },
    parent: {
      type: "page_id",
      page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
    },
    url: "https://www.notion.so/bc1211cae3f14939ae34260b16f627c",
    archived: false,
  },
};

export const listDatabasesResponse = {
  data: {
    object: "list",
    results: [
      {
        object: "database",
        id: "bc1211ca-e3f1-4939-ae34-5260b16f627c",
        created_time: "2021-07-08T23:50:00.000Z",
        last_edited_time: "2021-07-08T23:50:00.000Z",
        title: [
          {
            type: "text",
            text: {
              content: "Grocery List",
              link: null,
            },
            plain_text: "Grocery List",
          },
        ],
        properties: {
          Name: {
            id: "title",
            type: "title",
            title: {},
          },
        },
        parent: {
          type: "page_id",
          page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
        },
        url: "https://www.notion.so/bc1211cae3f14939ae34260b16f627c",
        archived: false,
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "database",
  },
};

export const queryDatabaseResponse = {
  data: {
    object: "list",
    results: [
      {
        object: "page",
        id: "59833787-2cf9-4fdf-8782-e53db20768a5",
        created_time: "2022-03-01T19:05:00.000Z",
        last_edited_time: "2022-07-06T19:16:00.000Z",
        parent: {
          type: "database_id",
          database_id: "bc1211ca-e3f1-4939-ae34-5260b16f627c",
        },
        archived: false,
        properties: {
          Name: {
            id: "title",
            type: "title",
            title: [
              {
                type: "text",
                text: {
                  content: "Grocery Item",
                  link: null,
                },
                plain_text: "Grocery Item",
              },
            ],
          },
        },
        url: "https://www.notion.so/Grocery-Item-598337872cf94fdf8782e53db20768a5",
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "page_or_database",
  },
};


export const createDatabaseItemResponse = createPageResponse;
