import type { DropboxResponse, files, sharing } from "dropbox";
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
export const getSharedLinkFileExamplePayload = createSharedLinkExamplePayload;
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
export const getTemporaryUploadLinkExamplePayload: DropboxResponse<files.GetTemporaryUploadLinkResult> =
  {
    status: 200,
    headers: {},
    result: {
      link: "https://content.dropboxapi.com/apitul/1/bNi2uIYF51cVBND",
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
