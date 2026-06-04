import type {
  async,
  DropboxResponse,
  files,
  sharing,
  team,
  users,
} from "dropbox";

export const getTemporaryLinkExamplePayload: DropboxResponse<files.GetTemporaryLinkResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: {
        name: "drums.jpg",
        path_lower: "/drums.jpg",
        path_display: "/drums.jpg",
        id: "id:kXzCDysyTmQAAAAAAAAAGw",
        client_modified: "2023-12-12T00:25:58Z",
        server_modified: "2023-12-12T00:25:59Z",
        rev: "60c45183ecb69f3e2a861",
        size: 175342,
        is_downloadable: true,
        content_hash:
          "2960e5e1f4e54e849d63862010035aea6d4f691aacc76abe5f33a80d670ec113",
      },
      link: "https://uc925b3fcc7a2208235a92b0e7e8.dl.dropboxusercontent.com/cd/0/get/COQEC7ffJgExogeJr8ngG5GH_4jW-iN6PC1heBZVwhZPs-3Wis_TJVR5GDHQnrLSuZRn8EhZVxFFxU9vOcpwZ2tbpIC59w1dQkaZ9Vs0q-8YPfD0hfLTOWy7iMpx5ymz6J9k6nnzHyr08sICt-RcM5jMk2ET8lwSQoQCeW6_TG6lWA/file",
    },
  };

export const lockFileBatchExamplePayload: DropboxResponse<files.LockFileBatchResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "success",
          lock: {
            content: {
              ".tag": "single_user",
              created: "2015-05-12T15:50:38Z",
              lock_holder_account_id:
                "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              lock_holder_team_id: "dbtid:1234abcd",
            },
          },
          metadata: {
            ".tag": "file",
            client_modified: "2015-05-12T15:50:38Z",
            content_hash:
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            file_lock_info: {
              created: "2015-05-12T15:50:38Z",
              is_lockholder: true,
              lockholder_name: "Imaginary User",
            },
            has_explicit_shared_members: false,
            id: "id:a4ayc_80_OEAAAAAAAAAXw",
            is_downloadable: true,
            name: "Prime_Numbers.txt",
            path_display: "/Homework/math/Prime_Numbers.txt",
            path_lower: "/homework/math/prime_numbers.txt",
            property_groups: [
              {
                fields: [
                  {
                    name: "Security Policy",
                    value: "Confidential",
                  },
                ],
                template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
              },
            ],
            rev: "a1c10ce0dd78",
            server_modified: "2015-05-12T15:50:38Z",
            sharing_info: {
              modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              parent_shared_folder_id: "84528192421",
              read_only: true,
            },
            size: 7212,
          },
        },
      ],
    },
  };

export const listChangesExamplePayload = {
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

export const copyObjectExamplePayload: DropboxResponse<files.RelocationResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: {
        ".tag": "file",
        name: "myCopy",
        id: "exampleId",
        client_modified: new Date("2020-01-01").toUTCString(),
        server_modified: new Date("2020-01-01").toUTCString(),
        rev: undefined,
        size: 2048,
      },
    },
  };

export const createFolderExamplePayload: DropboxResponse<files.CreateFolderResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: { id: "exampleId", name: "myFolderName" },
    },
  };

export const createSharedLinkExamplePayload: DropboxResponse<
  | sharing.FileLinkMetadataReference
  | sharing.FolderLinkMetadataReference
  | sharing.SharedLinkMetadataReference
> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "file",
    client_modified: "2015-05-12T15:50:38Z",
    id: "id:a4ayc_80_OEAAAAAAAAAXw",
    link_permissions: {
      allow_comments: true,
      allow_download: true,
      audience_options: [
        {
          allowed: true,
          audience: {
            ".tag": "public",
          },
        },
        {
          allowed: false,
          audience: {
            ".tag": "team",
          },
        },
        {
          allowed: true,
          audience: {
            ".tag": "no_one",
          },
        },
      ],
      can_allow_download: true,
      can_disallow_download: false,
      can_remove_expiry: false,
      can_remove_password: true,
      can_revoke: false,
      can_set_expiry: false,
      can_set_password: true,
      can_use_extended_sharing_controls: false,
      require_password: false,
      resolved_visibility: {
        ".tag": "public",
      },
      revoke_failure_reason: {
        ".tag": "owner_only",
      },
      team_restricts_comments: true,
      visibility_policies: [
        {
          allowed: true,
          policy: {
            ".tag": "public",
          },
          resolved_policy: {
            ".tag": "public",
          },
        },
        {
          allowed: true,
          policy: {
            ".tag": "password",
          },
          resolved_policy: {
            ".tag": "password",
          },
        },
      ],
    },
    name: "Prime_Numbers.txt",
    path_lower: "/homework/math/prime_numbers.txt",
    rev: "a1c10ce0dd78",
    server_modified: "2015-05-12T15:50:38Z",
    size: 7212,
    team_member_info: {
      display_name: "Roger Rabbit",
      member_id: "dbmid:abcd1234",
      team_info: {
        id: "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
        name: "Acme, Inc.",
      },
    },
    url: "https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0",
  },
};

export const deleteObjectExamplePayload: DropboxResponse<files.DeleteResult> = {
  status: 200,
  headers: {},
  result: {
    metadata: {
      ".tag": "file",
      name: "myCopy",
      id: "exampleId",
      client_modified: new Date("2020-01-01").toUTCString(),
      server_modified: new Date("2020-01-01").toUTCString(),
      rev: undefined,
      size: 2048,
    },
  },
};

export const downloadFileExamplePayload = {
  data: Buffer.from("example"),
  contentType: "application/octet",
};

export const exportFileExamplePayload: DropboxResponse<files.ExportResult> = {
  status: 200,
  headers: {},
  result: {
    export_metadata: {
      export_hash:
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      name: "Prime_Numbers.xlsx",
      size: 7189,
    },
    file_metadata: {
      client_modified: "2015-05-12T15:50:38Z",
      content_hash:
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      file_lock_info: {
        created: "2015-05-12T15:50:38Z",
        is_lockholder: true,
        lockholder_name: "Imaginary User",
      },
      has_explicit_shared_members: false,
      id: "id:a4ayc_80_OEAAAAAAAAAXw",
      is_downloadable: true,
      name: "Prime_Numbers.txt",
      path_display: "/Homework/math/Prime_Numbers.txt",
      path_lower: "/homework/math/prime_numbers.txt",
      property_groups: [
        {
          fields: [
            {
              name: "Security Policy",
              value: "Confidential",
            },
          ],
          template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
        },
      ],
      rev: "a1c10ce0dd78",
      server_modified: "2015-05-12T15:50:38Z",
      sharing_info: {
        modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
        parent_shared_folder_id: "84528192421",
        read_only: true,
      },
      size: 7212,
    },
  },
};

export const getCurrentAccountExamplePayload: users.FullAccount = {
  account_id: "dbid:EXAMPLE",
  name: {
    given_name: "John",
    surname: "Doe",
    familiar_name: "John",
    display_name: "John Doe",
    abbreviated_name: "JD",
  },
  email: "john.doe@example.com",
  email_verified: true,
  profile_photo_url: "",
  disabled: false,
  country: "US",
  locale: "en",
  referral_link: "",
  is_paired: true,
  account_type: { ".tag": "basic" },
  root_info: {
    ".tag": "user",
    root_namespace_id: "123456789",
    home_namespace_id: "123456789",
  },
};

export const getDownloadStatusExamplePayload: DropboxResponse<files.SaveUrlJobStatus> =
  {
    status: 200,
    headers: {},
    result: {
      ".tag": "in_progress",
    },
  };

export const getFileLockExamplePayload: DropboxResponse<files.LockFileBatchResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "success",
          lock: {
            content: {
              ".tag": "single_user",
              created: "2015-05-12T15:50:38Z",
              lock_holder_account_id:
                "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              lock_holder_team_id: "dbtid:1234abcd",
            },
          },
          metadata: {
            ".tag": "file",
            client_modified: "2015-05-12T15:50:38Z",
            content_hash:
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            file_lock_info: {
              created: "2015-05-12T15:50:38Z",
              is_lockholder: true,
              lockholder_name: "Imaginary User",
            },
            has_explicit_shared_members: false,
            id: "id:a4ayc_80_OEAAAAAAAAAXw",
            is_downloadable: true,
            name: "Prime_Numbers.txt",
            path_display: "/Homework/math/Prime_Numbers.txt",
            path_lower: "/homework/math/prime_numbers.txt",
            property_groups: [
              {
                fields: [
                  {
                    name: "Security Policy",
                    value: "Confidential",
                  },
                ],
                template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
              },
            ],
            rev: "a1c10ce0dd78",
            server_modified: "2015-05-12T15:50:38Z",
            sharing_info: {
              modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              parent_shared_folder_id: "84528192421",
              read_only: true,
            },
            size: 7212,
          },
        },
      ],
    },
  };

export const getFileOrFolderMetadataExamplePayload: DropboxResponse<
  | files.FileMetadataReference
  | files.FolderMetadataReference
  | files.DeletedMetadataReference
> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "file",
    client_modified: "2015-05-12T15:50:38Z",
    content_hash:
      "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    file_lock_info: {
      created: "2015-05-12T15:50:38Z",
      is_lockholder: true,
      lockholder_name: "Imaginary User",
    },
    has_explicit_shared_members: false,
    id: "id:a4ayc_80_OEAAAAAAAAAXw",
    is_downloadable: true,
    name: "Prime_Numbers.txt",
    path_display: "/Homework/math/Prime_Numbers.txt",
    path_lower: "/homework/math/prime_numbers.txt",
    property_groups: [
      {
        fields: [
          {
            name: "Security Policy",
            value: "Confidential",
          },
        ],
        template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
      },
    ],
    rev: "a1c10ce0dd78",
    server_modified: "2015-05-12T15:50:38Z",
    sharing_info: {
      modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
      parent_shared_folder_id: "84528192421",
      read_only: true,
    },
    size: 7212,
  },
};

export const getSharedLinkFileExamplePayload: DropboxResponse<
  | sharing.FileLinkMetadataReference
  | sharing.FolderLinkMetadataReference
  | sharing.SharedLinkMetadataReference
> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "file",
    client_modified: "2015-05-12T15:50:38Z",
    id: "id:a4ayc_80_OEAAAAAAAAAXw",
    link_permissions: {
      allow_comments: true,
      allow_download: true,
      audience_options: [
        {
          allowed: true,
          audience: {
            ".tag": "public",
          },
        },
        {
          allowed: false,
          audience: {
            ".tag": "team",
          },
        },
        {
          allowed: true,
          audience: {
            ".tag": "no_one",
          },
        },
      ],
      can_allow_download: true,
      can_disallow_download: false,
      can_remove_expiry: false,
      can_remove_password: true,
      can_revoke: false,
      can_set_expiry: false,
      can_set_password: true,
      can_use_extended_sharing_controls: false,
      require_password: false,
      resolved_visibility: {
        ".tag": "public",
      },
      revoke_failure_reason: {
        ".tag": "owner_only",
      },
      team_restricts_comments: true,
      visibility_policies: [
        {
          allowed: true,
          policy: {
            ".tag": "public",
          },
          resolved_policy: {
            ".tag": "public",
          },
        },
        {
          allowed: true,
          policy: {
            ".tag": "password",
          },
          resolved_policy: {
            ".tag": "password",
          },
        },
      ],
    },
    name: "Prime_Numbers.txt",
    path_lower: "/homework/math/prime_numbers.txt",
    rev: "a1c10ce0dd78",
    server_modified: "2015-05-12T15:50:38Z",
    size: 7212,
    team_member_info: {
      display_name: "Roger Rabbit",
      member_id: "dbmid:abcd1234",
      team_info: {
        id: "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
        name: "Acme, Inc.",
      },
    },
    url: "https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0",
  },
};

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

export const getTeamInfoExamplePayload: DropboxResponse<team.MembersGetInfoV2Result> =
  {
    status: 200,
    headers: {},
    result: {
      members_info: [
        {
          ".tag": "member_info",
          profile: {
            account_id: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
            email: "tami@seagull.com",
            email_verified: false,
            external_id: "244423",
            groups: ["g:e2db7665347abcd600000000001a2b3c"],
            joined_on: "2015-05-12T15:50:38Z",
            member_folder_id: "20",
            membership_type: {
              ".tag": "full",
            },
            name: {
              abbreviated_name: "FF",
              display_name: "Franz Ferdinand (Personal)",
              familiar_name: "Franz",
              given_name: "Franz",
              surname: "Ferdinand",
            },
            profile_photo_url:
              "https://dl-web.dropbox.com/account_photo/get/dbaphid%3AAAHWGmIXV3sUuOmBfTz0wPsiqHUpBWvv3ZA?vers=1556069330102&size=128x128",
            secondary_emails: [
              {
                email: "grape@strawberry.com",
                is_verified: false,
              },
              {
                email: "apple@orange.com",
                is_verified: true,
              },
            ],
            status: {
              ".tag": "active",
            },
            team_member_id: "dbmid:FDFSVF-DFSDF",
          },
          roles: [
            {
              description: "Add, remove, and manage member accounts.",
              name: "User management admin",
              role_id: "pid_dbtmr:3456",
            },
          ],
        },
      ],
    },
  };

export const getTemporaryUploadLinkExamplePayload: DropboxResponse<files.GetTemporaryUploadLinkResult> =
  {
    status: 200,
    headers: {},
    result: {
      link: "https://content.dropboxapi.com/...",
    },
  };

export const listFolderExamplePayload: DropboxResponse<files.ListFolderResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "folder",
          id: "exampleId",
          name: "MyExampleFolder",
          path_lower: "/myexamplefolder",
        },
        {
          ".tag": "file",
          id: "exampleId",
          name: "MyImage.jpg",
          path_lower: "/myexamplefolder/myimage.jpg",
          client_modified: new Date("2020-01-01").toUTCString(),
          server_modified: new Date("2020-01-01").toUTCString(),
          rev: "681a01c39731",
          size: 213654,
        },
      ],
      cursor:
        "hgL45HTslKOhj1_GEut-DVuaNs4xrXzpwQZRyJ0-KCW0wWMQ5DZu68__ULJa0zDcBp3ZrMlCj3-ZuOy4kjc9H2o7Ohk9UsId0sxVZrXFX",
      has_more: true,
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

export const listSharedLinksExamplePayload: DropboxResponse<sharing.ListSharedLinksResult> =
  {
    status: 200,
    headers: {},
    result: {
      cursor: "ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu",
      has_more: true,
      links: [
        {
          ".tag": "file",
          client_modified: "2015-05-12T15:50:38Z",
          id: "id:a4ayc_80_OEAAAAAAAAAXw",
          link_permissions: {
            allow_comments: true,
            allow_download: true,
            audience_options: [
              {
                allowed: true,
                audience: {
                  ".tag": "public",
                },
              },
              {
                allowed: false,
                audience: {
                  ".tag": "team",
                },
              },
              {
                allowed: true,
                audience: {
                  ".tag": "no_one",
                },
              },
            ],
            can_allow_download: true,
            can_disallow_download: false,
            can_remove_expiry: false,
            can_remove_password: true,
            can_revoke: false,
            can_set_expiry: false,
            can_set_password: true,
            can_use_extended_sharing_controls: false,
            require_password: false,
            resolved_visibility: {
              ".tag": "public",
            },
            revoke_failure_reason: {
              ".tag": "owner_only",
            },
            team_restricts_comments: true,
            visibility_policies: [
              {
                allowed: true,
                policy: {
                  ".tag": "public",
                },
                resolved_policy: {
                  ".tag": "public",
                },
              },
              {
                allowed: true,
                policy: {
                  ".tag": "password",
                },
                resolved_policy: {
                  ".tag": "password",
                },
              },
            ],
          },
          name: "Prime_Numbers.txt",
          path_lower: "/homework/math/prime_numbers.txt",
          rev: "a1c10ce0dd78",
          server_modified: "2015-05-12T15:50:38Z",
          size: 7212,
          team_member_info: {
            display_name: "Roger Rabbit",
            member_id: "dbmid:abcd1234",
            team_info: {
              id: "dbtid:AAFdgehTzw7WlXhZJsbGCLePe8RvQGYDr-I",
              name: "Acme, Inc.",
            },
          },
          url: "https://www.dropbox.com/s/2sn712vy1ovegw8/Prime_Numbers.txt?dl=0",
        },
      ],
    },
  };

export const listSharingFoldersExamplePayload: DropboxResponse<sharing.ListFoldersResult> =
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

export const listTeamFoldersExamplePayload: DropboxResponse<team.TeamFolderListResult> =
  {
    status: 200,
    headers: {},
    result: {
      cursor: "ZtkX9_EHj3x7PMkVuFIhwKYXEpwpLwyxp9vMKomUhllil9q7eWiAu",
      has_more: false,
      team_folders: [
        {
          content_sync_settings: [
            {
              id: "id:a4ayc_80_OEAAAAAAAAAXw",
              sync_setting: {
                ".tag": "default",
              },
            },
          ],
          is_team_shared_dropbox: false,
          name: "Marketing",
          status: {
            ".tag": "active",
          },
          sync_setting: {
            ".tag": "default",
          },
          team_folder_id: "123456789",
        },
      ],
    },
  };

export const moveObjectExamplePayload: DropboxResponse<files.RelocationResult> =
  {
    status: 200,
    headers: {},
    result: {
      metadata: {
        ".tag": "file",
        name: "myCopy",
        id: "exampleId",
        client_modified: new Date("2020-01-01").toUTCString(),
        server_modified: new Date("2020-01-01").toUTCString(),
        rev: undefined,
        size: 2048,
      },
    },
  };

export const saveFromUrlExamplePayload: DropboxResponse<files.SaveUrlResult> = {
  status: 200,
  headers: {},
  result: {
    ".tag": "async_job_id",
    async_job_id: "LnMobEc7XVEAAAAAAAAAAQ",
  },
};

export const searchFilesExamplePayload: DropboxResponse<files.SearchV2Result> =
  {
    status: 200,
    headers: {},
    result: {
      has_more: false,
      matches: [
        {
          metadata: {
            ".tag": "metadata",
            metadata: {
              ".tag": "file",
              client_modified: "2015-05-12T15:50:38Z",
              content_hash:
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              has_explicit_shared_members: false,
              id: "id:a4ayc_80_OEAAAAAAAAAXw",
              is_downloadable: true,
              name: "Prime_Numbers.txt",
              path_display: "/Homework/math/Prime_Numbers.txt",
              path_lower: "/homework/math/prime_numbers.txt",
              rev: "a1c10ce0dd78",
              server_modified: "2015-05-12T15:50:38Z",
              sharing_info: {
                modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
                parent_shared_folder_id: "84528192421",
                read_only: true,
              },
              size: 7212,
            },
          },
        },
      ],
    },
  };

export const searchFoldersExamplePayload: DropboxResponse<files.SearchV2Result> =
  {
    status: 200,
    headers: {},
    result: {
      has_more: false,
      matches: [
        {
          metadata: {
            ".tag": "metadata",
            metadata: {
              ".tag": "file",
              client_modified: "2015-05-12T15:50:38Z",
              content_hash:
                "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
              has_explicit_shared_members: false,
              id: "id:a4ayc_80_OEAAAAAAAAAXw",
              is_downloadable: true,
              name: "Prime_Numbers.txt",
              path_display: "/Homework/math/Prime_Numbers.txt",
              path_lower: "/homework/math/prime_numbers.txt",
              rev: "a1c10ce0dd78",
              server_modified: "2015-05-12T15:50:38Z",
              sharing_info: {
                modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
                parent_shared_folder_id: "84528192421",
                read_only: true,
              },
              size: 7212,
            },
          },
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

export const unlockFileExamplePayload: DropboxResponse<files.LockFileBatchResult> =
  {
    status: 200,
    headers: {},
    result: {
      entries: [
        {
          ".tag": "success",
          lock: {
            content: {
              ".tag": "single_user",
              created: "2015-05-12T15:50:38Z",
              lock_holder_account_id:
                "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              lock_holder_team_id: "dbtid:1234abcd",
            },
          },
          metadata: {
            ".tag": "file",
            client_modified: "2015-05-12T15:50:38Z",
            content_hash:
              "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
            file_lock_info: {
              created: "2015-05-12T15:50:38Z",
              is_lockholder: true,
              lockholder_name: "Imaginary User",
            },
            has_explicit_shared_members: false,
            id: "id:a4ayc_80_OEAAAAAAAAAXw",
            is_downloadable: true,
            name: "Prime_Numbers.txt",
            path_display: "/Homework/math/Prime_Numbers.txt",
            path_lower: "/homework/math/prime_numbers.txt",
            property_groups: [
              {
                fields: [
                  {
                    name: "Security Policy",
                    value: "Confidential",
                  },
                ],
                template_id: "ptid:1a5n2i6d3OYEAAAAAAAAAYa",
              },
            ],
            rev: "a1c10ce0dd78",
            server_modified: "2015-05-12T15:50:38Z",
            sharing_info: {
              modified_by: "dbid:AAH4f99T0taONIb-OurWxbNQ6ywGRopQngc",
              parent_shared_folder_id: "84528192421",
              read_only: true,
            },
            size: 7212,
          },
        },
      ],
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

export const uploadFileExamplePayload: DropboxResponse<files.FileMetadata> = {
  status: 200,
  headers: {},
  result: {
    id: "exampleId",
    client_modified: new Date("2020-01-01").toUTCString(),
    server_modified: new Date("2020-01-01").toUTCString(),
    rev: undefined,
    size: 2048,
    name: "myFileName",
  },
};
