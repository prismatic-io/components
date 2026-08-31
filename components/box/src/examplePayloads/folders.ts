export const listFolderExamplePayload = {
  data: [
    {
      id: "12345",
      type: "folder",
      name: "Contracts",
      etag: "1",
      sequence_id: "3",
    },
    {
      id: "67890",
      type: "file",
      name: "contract.pdf",
      etag: "1",
      sequence_id: "3",
      sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
      file_version: {
        id: "12345",
        type: "file_version",
        sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
      },
      description: "Contract for Q1 renewal",
      size: 629644,
      created_at: "2012-12-12T10:53:43-08:00",
      modified_at: "2012-12-12T10:53:43-08:00",
      created_by: {
        id: "11446498",
        type: "user",
        name: "Aaron Levie",
        login: "ceo@example.com",
      },
      owned_by: {
        id: "11446498",
        type: "user",
        name: "Aaron Levie",
        login: "ceo@example.com",
      },
      item_status: "active",
    },
    {
      id: "11111",
      type: "web_link",
      name: "My Bookmark",
      etag: "1",
      sequence_id: "3",
      url: "https://www.example.com/example/1234",
    },
  ],
};
export const listFolderWithPaginationExamplePayload = {
  data: {
    entries: [
      {
        id: "12345",
        type: "folder",
        name: "Contracts",
        etag: "1",
        sequence_id: "3",
      },
      {
        id: "67890",
        type: "file",
        name: "contract.pdf",
        etag: "1",
        sequence_id: "3",
        sha1: "85136c79cbf9fe36bb9d05d0639c70c265c18d37",
        file_version: {
          id: "12345",
          type: "file_version",
          sha1: "134b65991ed521fcfe4724b7d814ab8ded5185dc",
        },
        description: "Contract for Q1 renewal",
        size: 629644,
        created_at: "2012-12-12T10:53:43-08:00",
        modified_at: "2012-12-12T10:53:43-08:00",
        created_by: {
          id: "11446498",
          type: "user",
          name: "Aaron Levie",
          login: "ceo@example.com",
        },
        owned_by: {
          id: "11446498",
          type: "user",
          name: "Aaron Levie",
          login: "ceo@example.com",
        },
        item_status: "active",
      },
    ],
    pagination: {
      next_marker: "JV9IRGZmieiBasejOG9yDCRNgd2ymoZIbjsxbJMjIs3kioVii",
      limit: 1000,
    },
  },
};
export const createFolderExamplePayload = {
  data: {
    type: "folder",
    id: "47892301654",
    name: "New Project Folder",
    created_at: "2024-03-15T09:30:00-07:00",
    description: "",
    item_status: "active",
    parent: { id: "0", type: "folder", name: "All Files" },
  },
};
