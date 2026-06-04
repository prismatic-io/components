import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, userId } from "../../inputs";

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve a specific user.",
  },
  perform: async (context, { connection, userId }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.get(`/v2/users/${userId}`);
    return { data };
  },
  inputs: {
    connection,
    userId,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      user: {
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
    },
  },
});
