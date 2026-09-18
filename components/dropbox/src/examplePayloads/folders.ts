import type { DropboxResponse, files } from "dropbox";
import type { ListChangesResult } from "../types";
import { searchFilesExamplePayload } from "./files";
export const createFolderExamplePayload: DropboxResponse<files.CreateFolderResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: { id: "id:wX5yZ6aB7cDAAAAAAAAAFg", name: "Homework" },
    },
  };
export const listChangesExamplePayload: ListChangesResult = {
  entries: [
    {
      ".tag": "deleted",
      name: "my-old-image.png",
      path_lower: "/my-old-image.png",
      path_display: "/my-old-image.png",
    },
    {
      ".tag": "file",
      name: "my-new-image.png",
      path_lower: "/my-new-image.png",
      path_display: "/my-new-image.png",
      id: "id:BTY6k_2K8PAAAAAAAAAX9g",
      client_modified: "2022-12-12T21:39:30Z",
      server_modified: "2022-12-12T22:40:57Z",
      rev: "5efa9326918a601c39731",
      size: 1758021,
      is_downloadable: true,
      content_hash:
        "dc05a61ecd59d294da1e971c4e40a980b9042c633b7bc777367991a046d2b32d",
    },
  ],
  cursor: "AAFCBKRdVxEXAMPLE",
  has_more: false,
};
export const listFolderExamplePayload: DropboxResponse<files.ListFolderResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "folder",
          id: "id:eF9gH0iJ1kLAAAAAAAAAGw",
          name: "MyExampleFolder",
          path_lower: "/myexamplefolder",
        },
        {
          ".tag": "file",
          id: "id:mN0oP1qR2sTAAAAAAAAAHg",
          name: "MyImage.jpg",
          path_lower: "/myexamplefolder/myimage.jpg",
          client_modified: "2024-06-21T16:45:00Z",
          server_modified: "2024-06-21T16:45:03Z",
          rev: "681a01c39731",
          size: 213654,
        },
      ],
      cursor:
        "hgL45HTslKOhj1_GEut-DVuaNs4xrXzpwQZRyJ0-KCW0wWMQ5DZu68__ULJa0zDcBp3ZrMlCj3-ZuOy4kjc9H2o7Ohk9UsId0sxVZrXFX",
      has_more: true,
    },
  };
export const searchFoldersExamplePayload = searchFilesExamplePayload;
