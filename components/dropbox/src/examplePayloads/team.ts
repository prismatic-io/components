import type { DropboxResponse, team } from "dropbox";
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
