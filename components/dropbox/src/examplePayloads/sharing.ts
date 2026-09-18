import type { async, DropboxResponse, sharing } from "dropbox";
export const getSharedMetadataForFileExamplePayload: DropboxResponse<sharing.SharedFileMetadata> =
  {
    status: 200,
    headers: {},
    result: {
      access_type: {
        ".tag": "viewer",
      },
      id: "id:3kmLmQFnf1AAAAAAAAAAAw",
      name: "file.txt",
      owner_display_names: ["Jane Doe"],
      owner_team: {
        id: "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
        name: "Acme, Inc.",
      },
      path_display: "/dir/file.txt",
      path_lower: "/dir/file.txt",
      permissions: [],
      policy: {
        acl_update_policy: {
          ".tag": "owner",
        },
        member_policy: {
          ".tag": "anyone",
        },
        resolved_member_policy: {
          ".tag": "team",
        },
        shared_link_policy: {
          ".tag": "anyone",
        },
      },
      preview_url: "https://www.dropbox.com/scl/fi/fir9vjelf",
      time_invited: "2016-01-20T00:00:00Z",
    },
  };
export const getSharedMetadataForFolderExamplePayload: DropboxResponse<sharing.SharedFolderMetadata> =
  {
    status: 200,
    headers: {},
    result: {
      access_inheritance: {
        ".tag": "inherit",
      },
      access_type: {
        ".tag": "owner",
      },
      is_inside_team_folder: false,
      is_team_folder: false,
      link_metadata: {
        audience_options: [
          {
            ".tag": "public",
          },
          {
            ".tag": "team",
          },
          {
            ".tag": "members",
          },
        ],
        current_audience: {
          ".tag": "public",
        },
        link_permissions: [
          {
            action: {
              ".tag": "change_audience",
            },
            allow: true,
          },
        ],
        password_protected: false,
        url: "",
      },
      name: "dir",
      path_lower: "/dir",
      permissions: [],
      policy: {
        acl_update_policy: {
          ".tag": "owner",
        },
        member_policy: {
          ".tag": "anyone",
        },
        resolved_member_policy: {
          ".tag": "team",
        },
        shared_link_policy: {
          ".tag": "anyone",
        },
      },
      preview_url: "https://www.dropbox.com/scl/fo/fir9vjelf",
      shared_folder_id: "84528192421",
      time_invited: "2016-01-20T00:00:00Z",
    },
  };
export const listSharedFoldersExamplePayload: DropboxResponse<sharing.ListFoldersResult> =
  {
    status: 200,
    headers: {},
    result: {
      cursor: "ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu",
      entries: [
        {
          access_inheritance: {
            ".tag": "inherit",
          },
          access_type: {
            ".tag": "owner",
          },
          is_inside_team_folder: false,
          is_team_folder: false,
          link_metadata: {
            audience_options: [
              {
                ".tag": "public",
              },
              {
                ".tag": "team",
              },
              {
                ".tag": "members",
              },
            ],
            current_audience: {
              ".tag": "public",
            },
            link_permissions: [
              {
                action: {
                  ".tag": "change_audience",
                },
                allow: true,
              },
            ],
            password_protected: false,
            url: "",
          },
          name: "dir",
          path_lower: "/dir",
          permissions: [],
          policy: {
            acl_update_policy: {
              ".tag": "owner",
            },
            member_policy: {
              ".tag": "anyone",
            },
            resolved_member_policy: {
              ".tag": "team",
            },
            shared_link_policy: {
              ".tag": "anyone",
            },
          },
          preview_url: "https://www.dropbox.com/scl/fo/fir9vjelf",
          shared_folder_id: "84528192421",
          time_invited: "2016-01-20T00:00:00Z",
        },
      ],
    },
  };
export const shareFolderExamplePayload: DropboxResponse<sharing.ShareFolderLaunch> =
  {
    status: 200,
    headers: {},
    result: {
      ".tag": "complete",
      access_inheritance: {
        ".tag": "inherit",
      },
      access_type: {
        ".tag": "owner",
      },
      is_inside_team_folder: false,
      is_team_folder: false,
      link_metadata: {
        audience_options: [
          {
            ".tag": "public",
          },
          {
            ".tag": "team",
          },
          {
            ".tag": "members",
          },
        ],
        current_audience: {
          ".tag": "public",
        },
        link_permissions: [
          {
            action: {
              ".tag": "change_audience",
            },
            allow: true,
          },
        ],
        password_protected: false,
        url: "",
      },
      name: "dir",
      path_lower: "/dir",
      permissions: [],
      policy: {
        acl_update_policy: {
          ".tag": "owner",
        },
        member_policy: {
          ".tag": "anyone",
        },
        resolved_member_policy: {
          ".tag": "team",
        },
        shared_link_policy: {
          ".tag": "anyone",
        },
      },
      preview_url: "https://www.dropbox.com/scl/fo/fir9vjelf",
      shared_folder_id: "84528192421",
      time_invited: "2016-01-20T00:00:00Z",
    },
  };
export const unshareFileExamplePayload: DropboxResponse<void> = {
  status: 200,
  headers: {},
  result: null,
};
export const unshareFolderExamplePayload: DropboxResponse<async.LaunchEmptyResult> =
  {
    status: 200,
    headers: {},
    result: {
      ".tag": "complete",
    },
  };
