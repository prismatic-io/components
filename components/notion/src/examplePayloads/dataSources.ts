export const retrieveDataSourceResponse = {
  data: {
    object: "data_source",
    id: "2f26ee68-df30-4251-aad4-8ddc420cba3d",
    properties: {
      Name: {
        id: "title",
        name: "Name",
        type: "title",
        title: {},
      },
      Description: {
        id: "V}lX",
        name: "Description",
        type: "rich_text",
        rich_text: {},
      },
      Status: {
        id: "select_1",
        name: "Status",
        type: "select",
        select: {
          options: [
            {
              id: "opt-1",
              name: "Not Started",
              color: "gray",
            },
            {
              id: "opt-2",
              name: "In Progress",
              color: "blue",
            },
            {
              id: "opt-3",
              name: "Completed",
              color: "green",
            },
          ],
        },
      },
    },
    parent: {
      type: "database_id",
      database_id: "842a0286-cef0-46a8-abba-eac4c8ca644e",
    },
    database_parent: {
      type: "page_id",
      page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
    },
    created_time: "2020-03-17T19:10:04.968Z",
    created_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    last_edited_time: "2020-03-17T21:49:37.913Z",
    last_edited_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    title: [
      {
        type: "text",
        text: {
          content: "Tasks",
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
        plain_text: "Tasks",
        href: null,
      },
    ],
    description: [],
    archived: false,
    in_trash: false,
  },
};

export const queryDataSourceResponse = {
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
                  content: "Sample Item",
                  link: null,
                },
                plain_text: "Sample Item",
              },
            ],
          },
        },
        url: "https://www.notion.so/Sample-Item-598337872cf94fdf8782e53db20768a5",
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "page_or_database",
  },
};

export const listDataSourcesResponse = {
  data: {
    object: "list",
    results: [
      {
        object: "data_source",
        id: "2f26ee68-df30-4251-aad4-8ddc420cba3d",
        properties: {
          Name: {
            id: "title",
            name: "Name",
            type: "title",
            title: {},
          },
        },
        parent: {
          type: "database_id",
          database_id: "842a0286-cef0-46a8-abba-eac4c8ca644e",
        },
        created_time: "2020-03-17T19:10:04.968Z",
        created_by: {
          object: "user",
          id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
        },
        last_edited_time: "2020-03-17T21:49:37.913Z",
        last_edited_by: {
          object: "user",
          id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
        },
        title: [
          {
            type: "text",
            text: {
              content: "Tasks",
              link: null,
            },
            plain_text: "Tasks",
          },
        ],
        description: [],
        archived: false,
        in_trash: false,
      },
    ],
    next_cursor: null,
    has_more: false,
    type: "data_source",
  },
};

export const createDataSourceResponse = {
  data: {
    object: "data_source",
    id: "3c26ee68-df30-4251-aad4-8ddc420cba3e",
    properties: {
      Name: {
        id: "title",
        name: "Name",
        type: "title",
        title: {},
      },
      Description: {
        id: "V}lX",
        name: "Description",
        type: "rich_text",
        rich_text: {},
      },
    },
    parent: {
      type: "database_id",
      database_id: "842a0286-cef0-46a8-abba-eac4c8ca644e",
    },
    database_parent: {
      type: "page_id",
      page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
    },
    created_time: "2024-01-15T10:30:00.000Z",
    created_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    last_edited_time: "2024-01-15T10:30:00.000Z",
    last_edited_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    title: [
      {
        type: "text",
        text: {
          content: "New Data Source",
          link: null,
        },
        plain_text: "New Data Source",
      },
    ],
    description: [],
    archived: false,
    in_trash: false,
  },
};

export const updateDataSourceResponse = {
  data: {
    object: "data_source",
    id: "2f26ee68-df30-4251-aad4-8ddc420cba3d",
    properties: {
      Name: {
        id: "title",
        name: "Name",
        type: "title",
        title: {},
      },
      Description: {
        id: "V}lX",
        name: "Description",
        type: "rich_text",
        rich_text: {},
      },
      Priority: {
        id: "select_2",
        name: "Priority",
        type: "select",
        select: {
          options: [
            {
              id: "opt-low",
              name: "Low",
              color: "gray",
            },
            {
              id: "opt-med",
              name: "Medium",
              color: "yellow",
            },
            {
              id: "opt-high",
              name: "High",
              color: "red",
            },
          ],
        },
      },
    },
    parent: {
      type: "database_id",
      database_id: "842a0286-cef0-46a8-abba-eac4c8ca644e",
    },
    database_parent: {
      type: "page_id",
      page_id: "98ad959b-2b6a-4774-80ee-00246fb0ea9b",
    },
    created_time: "2020-03-17T19:10:04.968Z",
    created_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    last_edited_time: "2024-01-15T14:25:00.000Z",
    last_edited_by: {
      object: "user",
      id: "45ee8d13-687b-47ce-a5ca-6e2e45548c4b",
    },
    title: [
      {
        type: "text",
        text: {
          content: "Updated Tasks",
          link: null,
        },
        plain_text: "Updated Tasks",
      },
    ],
    description: [
      {
        type: "text",
        text: {
          content: "A data source for tracking tasks",
          link: null,
        },
        plain_text: "A data source for tracking tasks",
      },
    ],
    archived: false,
    in_trash: false,
  },
};

export const selectDataSourceResponse = {
  result: [
    {
      label: "Tasks",
      key: "2f26ee68-df30-4251-aad4-8ddc420cba3d",
    },
    {
      label: "Projects",
      key: "3c26ee68-df30-4251-aad4-8ddc420cba3e",
    },
  ],
};

export const selectPageResponse = {
  result: [
    {
      label: "Welcome Page",
      key: "59833787-2cf9-4fdf-8782-e53db20768a5",
    },
    {
      label: "Getting Started",
      key: "69833787-2cf9-4fdf-8782-e53db20768a6",
    },
  ],
};
