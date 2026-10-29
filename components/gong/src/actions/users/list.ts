import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, cursor, includeAvatars } from "../../inputs";

export const listUsers = action({
  display: {
    label: "List Users",
    description: "List all of the company's users.",
  },
  perform: async (context, { connection, cursor, includeAvatars }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/users`, {
      params: { cursor, includeAvatars },
    });
    return { data };
  },
  inputs: {
    connection,
    cursor,
    includeAvatars,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      records: {
        totalRecords: 263,
        currentPageSize: 100,
        currentPageNumber: 0,
        cursor:
          "eyJhbGciOiJIUzI1NiJ9.eyJjYWxsSWQiM1M30.6qKwpOcvnuweTZmFRzYdtjs_YwJphJU4QIwWFM",
      },
      users: [
        {
          id: "234599484848423",
          emailAddress: "test@test.com",
          created: "2018-02-17T02:30:00-08:00",
          active: true,
          emailAliases: ["testAlias@test.com"],
          trustedEmailAddress: "test@test.com",
          firstName: "Jon",
          lastName: "Snow",
          title: "Enterprise Account Executive",
          phoneNumber: "+1 123-567-8989",
          extension: "123",
          personalMeetingUrls: ["https://zoom.us/j/123"],
          settings: {
            webConferencesRecorded: true,
            preventWebConferenceRecording: false,
            telephonyCallsImported: false,
            emailsImported: true,
            preventEmailImport: false,
            nonRecordedMeetingsImported: true,
            gongConnectEnabled: true,
          },
          managerId: "563515258458745",
          meetingConsentPageUrl:
            "https://join.gong.io/my-company/jon.snow?tkn=MoNpS9tMNt8BK7EZxQpSJl",
          spokenLanguages: [
            {
              language: "es-ES",
              primary: true,
            },
          ],
        },
      ],
    },
  },
});
