import { input, util } from "@prismatic-io/spectral";
import {
  jsonInputClean,
  toOptionalNumber,
  toOptionalString,
  valueListInputClean,
} from "./util";
import { pollResourceModel } from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const callId = input({
  label: "Call Id",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Gong's unique numeric identifier for the call (up to 20 digits)",
  example: "1230788881967087399",
  placeholder: "Enter call ID",
  dataSource: "calls",
});

export const userId = input({
  label: "User Id",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Gong's unique numeric identifier for the user (up to 20 digits).",
  example: "1230788881967087399",
  placeholder: "Enter user ID",
  dataSource: "users",
});

export const folderId = input({
  label: "Folder Id",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "Gong's unique numeric identifier for the folder (up to 20 digits).",
  example: "1230788881967087399",
  placeholder: "Enter folder ID",
  dataSource: "folders",
});

export const cursor = input({
  label: "Cursor",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "When paging is needed, provide the value supplied by the previous API call to bring the following page of records.",
  example:
    "eyJhbGciOiJIUzI1NiJ9.eyJjYWxsSWQiM1M30.6qKwpOcvnuweTZmFRzYdtjs_YwJphJU4QIwWFM",
  placeholder: "Enter pagination cursor",
});

export const startTime = input({
  label: "Start Time",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The meeting start time in ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC).",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T02:30:00-07:00",
});

export const endTime = input({
  label: "End Time",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The meeting end time in ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC).",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T03:30:00-07:00",
});

export const fromDateTime = input({
  label: "From Date Time",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "Date and time (in ISO-8601 format: '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC) from which to list recorded calls. Returns calls that started on or after the specified date and time. If not provided, list starts with earliest call. For web-conference calls recorded by Gong, the date denotes its scheduled time, otherwise, it denotes its actual start time.",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T02:30:00-07:00",
});

export const toDateTime = input({
  label: "To Date Time",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "Date and time (in ISO-8601 format: '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC) until which to list recorded calls. Returns calls that started up to but excluding specified date and time. If not provided, list ends with most recent call. For web-conference calls recorded by Gong, the date denotes its scheduled time, otherwise, it denotes its actual start time.",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-20T02:30:00-07:00",
});

export const workspaceId = input({
  label: "Workspace Id",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "Optional Workspace identifier, if supplied the API will return only the calls belonging to this workspace.",
  example: "1230788881967087399",
  placeholder: "Enter workspace ID",
  dataSource: "workspaces",
});

export const clientUniqueId = input({
  label: "Client Unique Id",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "A call's unique identifier in the PBX or the recording system. Gong uses this identifier to prevent repeated attempts to upload the same recording.",
  example: "1230788881967087399",
  placeholder: "Enter unique identifier",
});

export const title = input({
  label: "Title",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The title of the call. This title is available in the Gong system for indexing and search.",
  example: "Example call",
  placeholder: "Enter call title",
});

export const purpose = input({
  label: "Purpose",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The purpose of the call. This optional field is a free text of up to 255 characters.",
  example: "Demo call",
  placeholder: "Enter call purpose",
});

export const scheduledStart = input({
  label: "Scheduled Start",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The date and time the call was scheduled to begin in the ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC)",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T02:30:00-07:00",
});

export const scheduledEnd = input({
  label: "Scheduled End",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The date and time the call was scheduled to end in the ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC)",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T03:30:00-07:00",
});

export const actualStart = input({
  label: "Actual Start",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The actual date and time when the call started in the ISO-8601 format (e.g., '2018-02-18T02:30:00-07:00' or '2018-02-18T08:00:00Z', where Z stands for UTC)",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T02:30:00-07:00",
});

export const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  clean: toOptionalNumber,
  comments: "The actual call duration in seconds.",
  example: "125.8",
  placeholder: "Enter duration in seconds",
});

export const parties = input({
  label: "Parties",
  type: "code",
  language: "json",
  comments:
    "A list of the call's participants. A party must be provided for the primaryUser.",
  example: JSON.stringify(
    [
      {
        phoneNumber: "+1 123-567-8989",
        emailAddress: "test@test.com",
        name: "Test User",
        partyId: "1",
        mediaChannelId: 0,
        context: [
          {
            system: "Salesforce",
            objects: [
              {
                objectType: "Contact",
                objectId: "0013601230sV7grAAC",
                fields: [
                  {
                    name: "name",
                    value: "Gong Inc.",
                  },
                ],
              },
            ],
          },
        ],
        userId: "234599484848423",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const direction = input({
  label: "Direction",
  type: "string",
  comments:
    "Whether the call is inbound (someone called the company), outbound (a rep dialed someone outside the company), or a conference call.",
  clean: util.types.toString,
  model: [
    {
      label: "Inbound",
      value: "Inbound",
    },
    {
      label: "Outbound",
      value: "Outbound",
    },
    {
      label: "Conference",
      value: "Conference",
    },
    {
      label: "Unknown",
      value: "Unknown",
    },
  ],
  required: true,
  example: "Inbound",
});

export const disposition = input({
  label: "Disposition",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The disposition of the call. The disposition is free text of up to 255 characters.",
  example: "No Answer",
  placeholder: "Enter call disposition",
});

export const context = input({
  label: "Context",
  type: "code",
  language: "json",
  comments:
    "A list of references to external systems such as CRM, Telephony System, Case Management, etc.",
  example: JSON.stringify(
    [
      {
        system: "Salesforce",
        objects: [
          {
            objectType: "Account",
            objectId: "0013601230sV7grAAC",
            fields: [
              {
                name: "name",
                value: "Gong Inc.",
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const customData = input({
  label: "Custom Data",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "Optional metadata associated with the call (represented as text). Gong stores this metadata and it can be used for troubleshooting.",
  example: "Optional data",
  placeholder: "Enter custom metadata",
});

export const speakersTimeline = input({
  label: "Speakers Timeline",
  type: "code",
  language: "json",
  comments:
    "The audio recording speech segments (who spoke when). Note that speakersTimeline and mediaChannelId are mutually exclusive, when providing speakersTimeline - mediaChannelId will not be used.",
  example: JSON.stringify(
    {
      precise: true,
      speechSegments: [
        {
          fromTime: 5100,
          toTime: 24000,
          partyIds: ["1"],
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const meetingUrl = input({
  label: "Meeting URL",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments: "The URL of the conference call by which users join the meeting",
  example: "https://example.com/meeting/john.smith",
  placeholder: "https://example.com/meeting",
});

export const callProviderCode = input({
  label: "Call Provider Code",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The code identifies the provider conferencing or telephony system. For example: zoom, clearslide, gotomeeting, ringcentral, outreach, insidesales, etc. These values are predefined by Gong, please contact help@gong.io to find the proper value for your system.",
  example: "clearslide",
  placeholder: "Enter provider code",
});

export const downloadMediaUrl = input({
  label: "Download Media URL",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The URL from which Gong can download the media file. The URL must be unique, the audio or video file must be a maximum of 1.5GB. If you provide this URL, you should not perform the 'Add call media' step.",
  example: "https://example.com/media/sample-call.mp3",
  placeholder: "https://example.com/media.mp3",
});

export const languageCode = input({
  label: "Language Code",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments:
    "The language code the call should be transcribed to. This field is optional as Gong automatically detects the language spoken in the call and transcribes it accordingly. Set this field only if you are sure of the language the call is in. Valid values are: af-ZA, am-ET, ar-AE, ar-BH, ar-DZ, ar-EG, ar-IL, ar-IQ, ar-JO, ar-KW, ar-LB, ar-MA, ar-MR, ar-OM, ar-PS, ar-QA, ar-SA, ar-TN, ar-YE, az-AZ, bg-BG, bn-BD, bn-IN, bs-BA, ca-ES, cs-CZ, da-DK, de-AT, de-CH, de-DE, el-GR, en-AB, en-AU, en-CA, en-GB, en-IE, en-IN, en-NZ, en-PH, en-SG, en-US, en-WL, en-ZA, es-AR, es-BO, es-CL, es-CO, es-CR, es-DO, es-EC, es-ES, es-GT, es-HN, es-MX, es-NI, es-PA, es-PE, es-PR, es-PY, es-SV, es-US, es-UY, et-EE, eu-ES, fa-IR, fi-FI, fil-PH, fr-BE, fr-CA, fr-CH, fr-FR, gl-ES, gu-IN, he-IL, hi-IN, hr-HR, hu-HU, hy-AM, id-ID, is-IS, it-CH, it-IT, ja-JP, jv-ID, ka-GE, kk-KZ, km-KH, kn-IN, ko-KR, lo-LA, lt-LT, lv-LV, mk-MK, ml-IN, mn-MN, mr-IN, ms-MY, my-MM, ne-NP, nl-BE, nl-NL, no-NO, pa-Guru-IN, pl-PL, pt-BR, pt-PT, ro-RO, ru-RU, si-LK, sk-SK, sl-SI, sq-AL, sr-RS, su-ID, sv-SE, sw-KE, sw-TZ, ta-IN, ta-LK, ta-MY, ta-SG, te-IN, th-TH, tr-TR, uk-UA, ur-IN, ur-PK, uz-UZ, vi-VN, yue-Hant-HK, zh-CN, zh-TW, zu-ZA",
  example: "en-US",
  placeholder: "en-US",
});

export const primaryUser = input({
  label: "Primary User",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The Gong internal user ID of the team member who hosted the call.",
  example: "234599484848423",
  placeholder: "Enter user ID",
});

export const fileInput = input({
  label: "File",
  type: "data",
  required: true,
  clean: util.types.toData,
  example: "Some binary file",
});

export const fileName = input({
  label: "File Name",
  type: "string",
  required: true,
  comments: "The name of the file",
  clean: util.types.toString,
  example: "some-file-name.txt",
  placeholder: "Enter file name",
});

export const callIds = input({
  label: "Call Ids",
  type: "string",
  collection: "valuelist",
  required: false,
  comments:
    "List of calls Ids to be filtered. If not supplied, returns all calls between fromDateTime and toDateTime.",
  default: ["000xxx"],
  clean: valueListInputClean,
  example: "7782342274025937895",
  dataSource: "calls",
});

export const includeAvatars = input({
  label: "Include Avatars",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
  comments:
    "Avatars are synthetic users representing Gong employees (CSMs and support providers) when they access your instance. References to avatars' IDs may be found in the outputs of other API endpoints. This parameter is optional, if not provided avatars will not be included in the results.",
  example: "false",
});

export const invitees = input({
  label: "Invitees",
  type: "code",
  language: "json",
  comments:
    "A list of email addresses of invitees to the event (not including the organizer).",
  example: JSON.stringify(
    [
      {
        displayName: "Cookie Monster",
        email: "cookie.monster@cookies.com",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: true,
});

export const externalId = input({
  label: "External ID",
  type: "string",
  required: false,
  clean: toOptionalString,
  comments: "The ID as it is formed on the external system.",
  example: "7JEHFRGXDDZFEW2FC4U",
  placeholder: "Enter external ID",
});

export const organizerEmail = input({
  label: "Organizer Email",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The email address of the user creating the meeting, the Gong consent page link will be used according to the settings of this user.",
  example: "test@test.com",
  placeholder: "user@company.com",
});

export const meetingId = input({
  label: "Meeting ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "Gong's unique identifier for the meeting (up to 20 digits).",
  example: "7782342274025937895",
  placeholder: "Enter meeting ID",
});

export const logType = input({
  label: "Log Type",
  type: "string",
  comments: "Type of logs requested.",
  clean: util.types.toString,
  model: [
    {
      label: "AccessLog",
      value: "AccessLog",
    },
    {
      label: "UserActivityLog",
      value: "UserActivityLog",
    },
    {
      label: "UserCallPlay",
      value: "UserCallPlay",
    },
    {
      label: "ExternallySharedCallAccess",
      value: "ExternallySharedCallAccess",
    },
    {
      label: "ExternallySharedCallPlay",
      value: "ExternallySharedCallPlay",
    },
  ],
  required: true,
});

export const emailAddress = input({
  label: "Email Address",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The email address.",
  example: "test@test.com",
  placeholder: "user@company.com",
});

export const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The phone number. This number must start with a + (plus) sign followed by the country code, area code, and local phone number. All other non-digits are ignored. The following are examples of permitted phone numbers: +1 425 555 2671, +1-425-555-2671, +1 425 5552671, +14255552671, +1 425 555 26 71, +1(425) 555-2671, etc.",
  example: "+1 425 555 2671",
  placeholder: "+1 425 555 2671",
});

export const reportingSystem = input({
  label: "Reporting System",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The unique identifier of the reporting system. It is the same value in all events originating from the same system.",
  example: "abc123",
  placeholder: "Enter system ID",
});

export const eventTimestamp = input({
  label: "Event Timestamp",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments:
    "The date and time when the event happened in the ISO-8601 format (e.g., '2021-08-01T02:30:00+05:00' or '2021-08-01T08:00:00Z', where Z stands for UTC);",
  example: "2018-02-18T02:30:00-07:00",
  placeholder: "2018-02-18T02:30:00-07:00",
});

export const eventId = input({
  label: "Event Id",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The original id of the event as designated in the reporting system.",
  example: "7782342274025932395",
  placeholder: "Enter event ID",
});

export const contentId = input({
  label: "Content Id",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "The id of the content that was viewed in the reporting system.",
  example: "7782342223025937895",
  placeholder: "Enter content ID",
});

export const contentUrl = input({
  label: "Content Url",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The url of the content that was viewed in the reporting system. This is the url that is was accessed by the viewer.",
  example: "https://example.com/doc_123456789",
  placeholder: "https://example.com/document",
});

export const contentTitle = input({
  label: "Content Title",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "Human readable title of the content.",
  example: "Features & Spec V.1",
  placeholder: "Enter content title",
});

export const shareInfoUrl = input({
  label: "Share Info Url",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The link to a page that presents additional information about this event.",
  example: "https://example.com/path/to/a/page",
  placeholder: "https://example.com/info",
});

export const actionName = input({
  label: "Action Name",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The name of the action like 'Document Viewed' or 'Presentation Opened'.",
  example: "Document Viewed",
  placeholder: "Enter action name",
});

export const eventInfoUrl = input({
  label: "Event Info Url",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The link to a page that presents additional information about this event.",
  example: "https://example.com/path/to/a/page",
  placeholder: "https://example.com/event",
});

export const userAgent = input({
  label: "User Agent",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "'User-Agent' header value for browser based interaction",
  example: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
  placeholder: "Mozilla/5.0 (compatible; Browser)",
});

export const mobileAppId = input({
  label: "Mobile App Id",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The application identification string in case of interaction via mobile application (bundle identifier or package name).",
  example: "com.example.app",
  placeholder: "com.yourcompany.app",
});

export const moreInfoUrl = input({
  label: "More Info Url",
  type: "string",
  required: false,
  clean: util.types.toString,
  example: "https://example.com/path/to/a/page",
  placeholder: "https://example.com/info",
});

export const shareId = input({
  label: "Share Id",
  type: "string",
  required: false,
  clean: util.types.toString,
  example: "7782342223025937895",
  placeholder: "Enter share ID",
});

export const sharingMessageSubject = input({
  label: "Sharing Message Subject",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments: "The subject of share email / message.",
  example: "Check out this document",
  placeholder: "Enter message subject",
});

export const sharingMessageBody = input({
  label: "Sharing Message Body",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The share message body. Can contain HTML and will be cleaned when it is presented.",
  example: "Check out this document",
  placeholder: "Enter message body",
});

export const actor = input({
  label: "Actor",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      email: "test@test.com",
      name: "Test User",
      title: "Enterprise Account Executive",
      context: [
        {
          system: "Salesforce",
          objects: [
            {
              objectType: "Contact",
              objectId: "0013601230sV7grAAC",
              fields: [
                {
                  name: "name",
                  value: "Gong Inc.",
                },
              ],
            },
          ],
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const crmContext = input({
  label: "CRM Context",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        system: "Salesforce",
        objects: [
          {
            objectType: "Account",
            objectId: "0013601230sV7grAAC",
            fields: [
              {
                name: "name",
                value: "Gong Inc.",
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const contentProperties = input({
  label: "Content Properties",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        name: "string",
        value: "string",
        dataType: "string",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const eventProperties = input({
  label: "Event Properties",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        name: "string",
        value: "string",
        dataType: "string",
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const nonCompanyParticipants = input({
  label: "Non Company Participants",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        email: "test@test.com",
        name: "Test User",
        title: "Enterprise Account Executive",
        context: [
          {
            system: "Salesforce",
            objects: [
              {
                objectType: "Contact",
                objectId: "0013601230sV7grAAC",
                fields: [
                  {
                    name: "name",
                    value: "Gong Inc.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const sharer = input({
  label: "Sharer",
  type: "code",
  language: "json",
  example: JSON.stringify({
    id: "234599484848423",
    email: "test@test.com",
    name: "Test User",
  }),
  clean: jsonInputClean,
  required: false,
});

export const recipients = input({
  label: "Recipients",
  type: "code",
  language: "json",
  example: JSON.stringify(
    [
      {
        email: "test@test.com",
        name: "Test User",
        title: "Enterprise Account Executive",
        context: [
          {
            system: "Salesforce",
            objects: [
              {
                objectType: "Contact",
                objectId: "0013601230sV7grAAC",
                fields: [
                  {
                    name: "name",
                    value: "Gong Inc.",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const agentPlatform = input({
  label: "Agent Platform",
  type: "string",
  comments: "Platform on which the interaction was made",
  clean: util.types.toString,
  model: [
    {
      label: "Windows",
      value: "Windows",
    },
    {
      label: "Linux",
      value: "Linux",
    },
    {
      label: "MacOS",
      value: "MacOS",
    },
    {
      label: "iOS",
      value: "iOS",
    },
    {
      label: "Android",
      value: "Android",
    },
  ],
  required: false,
  example: "Windows",
});

export const viewActionTitle = input({
  label: "View Action Title",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The name of the action like 'Document Viewed' or 'Presentation Opened'.",
  example: "Document Viewed",
  placeholder: "Enter action title",
});

export const viewInfoUrl = input({
  label: "View Info URL",
  type: "string",
  required: false,
  clean: util.types.toString,
  comments:
    "The link to a page that presents additional information about this event.",
  example: "https://example.com/path/to/a/page",
  placeholder: "https://example.com/info",
});

export const viewer = input({
  label: "Viewer",
  type: "code",
  language: "json",
  example: JSON.stringify(
    {
      email: "test@test.com",
      name: "Test User",
      title: "Enterprise Account Executive",
      context: [
        {
          system: "Salesforce",
          objects: [
            {
              objectType: "Contact",
              objectId: "0013601230sV7grAAC",
              fields: [
                {
                  name: "name",
                  value: "Gong Inc.",
                },
              ],
            },
          ],
        },
      ],
    },
    null,
    2,
  ),
  clean: jsonInputClean,
  required: false,
});

export const pollResourceType = input({
  label: "Resource Type",
  type: "string",
  required: true,
  comments: "The type of resource to poll for new records.",
  model: pollResourceModel,
  clean: util.types.toString,
});

export const showNewRecords = input({
  label: "Show New Records",
  type: "boolean",
  required: true,
  default: "true",
  comments: "Include newly created records in trigger results.",
  clean: util.types.toBool,
});
