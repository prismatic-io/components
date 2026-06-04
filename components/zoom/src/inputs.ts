import { input, util } from "@prismatic-io/spectral";
import {
  cleanCodeInput,
  cleanNumberInput,
  cleanStringInput,
  cleanStringValueListInput,
} from "./util";
import {
  CUSTOM_ATTRIBUTES_DEFAULT,
  LOGIN_TYPES,
  PHONE_NUMBERS_DEFAULT,
  SETTINGS_EXTRA_FIELDS_DEFAULT,
  TRACKING_FIELDS_DEFAULT,
  ZOOM_ONE_TYPES,
  ZOOM_ONE_TYPE_OFF,
  ZOOM_UNITED_PLANS,
  ZOOM_UNITED_PLAN_OFF,
} from "./constants";

export const connection = input({
  label: "Connection",
  type: "connection",
  required: true,
});

export const userId = input({
  label: "User Id",
  type: "string",
  required: true,
  comments: "Provide the unique identifier of a user.",
  example: "aB9kLmNsYxErt3VzjKp-2w",
  placeholder: "aB9kLmNsYxErt3VzjKp-2w",
  dataSource: "selectUser",
  clean: cleanStringInput,
});

export const webinarId = input({
  label: "Webinar Id",
  type: "string",
  required: true,
  comments: "Provide the unique identifier of a webinar.",
  example: "81279432123",
  placeholder: "81279432123",
  dataSource: "selectWebinar",
  clean: cleanStringInput,
});

export const meetingId = input({
  label: "Meeting Id",
  type: "string",
  required: true,
  comments: "Provide the unique identifier of a meeting.",
  example: "81279432123",
  placeholder: "81279432123",
  dataSource: "selectMeeting",
  clean: cleanStringInput,
});

export const userAction = input({
  label: "User Action",
  type: "string",
  required: true,
  model: [
    { label: "Create", value: "create" },
    { label: "Auto Create", value: "autoCreate" },
    { label: "Cust Create", value: "custCreate" },
    { label: "SSO Create", value: "ssoCreate" },
  ],
  comments: "The action to take to create the new user.",
  default: "create",
  clean: cleanStringInput,
});

export const email = input({
  label: "Email",
  type: "string",
  required: true,
  comments: "Provide a valid email address.",
  example: "someone@example.com",
  placeholder: "someone@example.com",
  clean: cleanStringInput,
});

export const userType = input({
  label: "User Type",
  type: "string",
  required: true,
  comments:
    "The value provided will determine the type of user that will be created.",
  model: [
    { label: "Basic", value: "1" },
    { label: "Licensed", value: "2" },
    { label: "SSO Create (none)", value: "99" },
  ],
  clean: cleanNumberInput,
});

export const firstName = input({
  label: "First Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the first name.",
  example: "John",
  placeholder: "John",
  clean: cleanStringInput,
});

export const lastName = input({
  label: "Last Name",
  type: "string",
  required: true,
  comments: "Provide a string value for the last name",
  example: "Doe",
  placeholder: "Doe",
  clean: cleanStringInput,
});

export const personalMeetingId = input({
  label: "Personal Meeting Id",
  type: "string",
  required: false,
  comments: "Provide an integer value for the personal meeting Id of a user.",
  example: "1234567890",
  placeholder: "1234567890",
  clean: cleanNumberInput,
});

export const timezone = input({
  label: "Timezone",
  type: "string",
  required: false,
  comments:
    "Provide a string value for a valid timezone. Refer to the Id value in the timezone list: https://developers.zoom.us/docs/api/rest/other-references/abbreviation-lists/#timezones",
  example: "America/New_York",
  placeholder: "America/New_York",
  clean: cleanStringInput,
});

export const department = input({
  label: "Timezone",
  type: "string",
  required: false,
  comments: "Provide a string value for the department of the user.",
  example: "Example Department",
  placeholder: "Example Department",
  clean: cleanStringInput,
});

export const vanityName = input({
  label: "Vanity Name",
  type: "string",
  required: false,
  comments: "This value will determine the name of your personal meeting room.",
  example: "Example Name",
  placeholder: "Example Name",
  clean: cleanStringInput,
});

export const hostKey = input({
  label: "Host Key",
  type: "string",
  required: false,
  comments: "Provide a 6-10 digit value for the host key of the user.",
  example: "4692486817",
  placeholder: "4692486817",
  clean: cleanStringInput,
});

export const cmsUserId = input({
  label: "CMS User Id",
  type: "string",
  required: false,
  comments: "Provide a string value for the user Id in the CMS.",
  example: "KDcuGIm1QgePTO8WbOqwIQ",
  placeholder: "KDcuGIm1QgePTO8WbOqwIQ",
  clean: cleanStringInput,
});

export const jobTitle = input({
  label: "Job Title",
  type: "string",
  required: false,
  comments: "Provide a string value for the job title.",
  example: "Graphic Designer",
  placeholder: "Graphic Designer",
  clean: cleanStringInput,
});

export const company = input({
  label: "Company",
  type: "string",
  required: false,
  comments: "Provide a string value for the company.",
  example: "Acme Inc.",
  placeholder: "Acme Inc.",
  clean: cleanStringInput,
});

export const location = input({
  label: "Location",
  type: "string",
  required: false,
  comments: "Provide a string value for the location.",
  example: "United States",
  placeholder: "United States",
  clean: cleanStringInput,
});

export const phoneNumber = input({
  label: "Phone Number",
  type: "string",
  required: false,
  comments: "Provide a string value for the phone number.",
  example: "16055551234",
  placeholder: "16055551234",
  clean: cleanStringInput,
});

export const meetingType = input({
  label: "Type",
  type: "string",
  required: true,
  comments: "Provide a value from the provided list.",
  default: "2", 
  model: [
    { label: "Instant meeting", value: "1" },
    { label: "Scheduled meeting", value: "2" },
    { label: "Recurring meeting (No Fixed Time)", value: "3" },
    { label: "Recurring meeting (Fixed Time)", value: "8" },
    { label: "Screen share only meeting ", value: "10" },
  ],
  clean: cleanNumberInput,
});

export const topic = input({
  label: "Topic",
  type: "string",
  required: false,
  comments: "Provide a string value for the topic.",
  example: "Daily Meeting",
  placeholder: "Daily Meeting",
  clean: cleanStringInput,
});

export const startTime = input({
  label: "Start Time",
  type: "string",
  required: false,
  comments:
    "The meeting's start time. This field is only used for scheduled or recurring meetings with a fixed time. This supports local time and GMT formats.",
  example: "2021-12-15T12:02:00Z",
  placeholder: "2021-12-15T12:02:00Z",
  clean: cleanStringInput,
});

export const duration = input({
  label: "Duration",
  type: "string",
  required: false,
  comments:
    "Provide a value for the duration in minutes. This field is only used for scheduled meetings.",
  example: "60",
  placeholder: "60",
  clean: cleanNumberInput,
});

export const password = input({
  label: "Password",
  type: "string",
  required: false,
  comments: "Provide a value up to 10 characters for the password.",
  example: "examplePass",
  placeholder: "examplePass",
  clean: cleanStringInput,
});

export const agenda = input({
  label: "Agenda",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the agenda. This property has a maximum length of 2,000 characters.",
  example: "In this meeting we will discuss...",
  placeholder: "In this meeting we will discuss...",
  clean: cleanStringInput,
});

export const recurrence = input({
  label: "Type Recurrence",
  type: "string",
  required: false,
  comments:
    "Pick a value from the provided list. This field is required only if you are scheduling a recurring meeting.",
  model: [
    { label: "Daily", value: "1" },
    { label: "Weekly", value: "2" },
    { label: "Monthly", value: "3" },
  ],
  clean: cleanNumberInput,
});

export const repeatInterval = input({
  label: "Repeat Interval",
  type: "string",
  required: false,
  comments:
    "Define the interval when the meeting should recur. For instance, to schedule a meeting that recurs every two months, set this field's value as 2 and the value of the Type field as 3.",
  example: "1",
  placeholder: "1",
  clean: cleanNumberInput,
});

export const weeklyDay = input({
  label: "Weekly Day",
  type: "string",
  required: false,
  comments:
    "This field is required if you're scheduling a recurring meeting of Type 2 to state the days of the week when the meeting should repeat. The value for this field could be a number between 1 to 7. For instance, if the meeting should recur on Sunday, provide 1 as this field's value. To set the meeting to occur on multiple days of a week, provide comma separated values for this field like 1,3 to set the meeting to occur on Sunday and Tuesday.",
  example: "1",
  placeholder: "1",
  clean: cleanStringInput,
});

export const monthlyDay = input({
  label: "Monthly Day",
  type: "string",
  required: false,
  comments:
    "Provide a value from 1-31 to determine which days of the month your meeting will occur on. For instance if you want your meeting to occur every 5th of each month, provide a 5. This field is required if you selected Type 3 for recurrence. ",
  example: "15",
  placeholder: "15",
  clean: cleanStringInput,
});

export const monthlyWeek = input({
  label: "Monthly Week",
  type: "string",
  required: false,
  comments:
    "Use this field only if you're scheduling a recurring meeting of Type 3 to state the week of the month when the meeting should recur. If you use this field, you must also use the Monthly Week Day field to state the day of the week when the meeting should recur.",
  model: [
    { label: "Last Week", value: "-1" },
    { label: "First Week", value: "1" },
    { label: "Second Week", value: "2" },
    { label: "Third Week", value: "3" },
    { label: "Fourth Week", value: "4" },
  ],
  clean: cleanNumberInput,
});

export const monthlyWeekDay = input({
  label: "Monthly Week Day",
  type: "string",
  required: false,
  comments:
    "Use this field only if you're scheduling a recurring meeting of Type 3 to state a specific day in a week when the monthly meeting should recur. To use this field, you must also use the Monthly Week field. Provide a value from 1 being Sunday to 7 being Saturday.",
  example: "1",
  placeholder: "1",
  clean: cleanNumberInput,
});

export const endDateTime = input({
  label: "End Date Time",
  type: "string",
  required: false,
  comments:
    "Select the final date when the meeting will recur before it is canceled. Cannot be used with the 'End Times' input.",
  example: "2017-11-25T12:00:00Z",
  placeholder: "2017-11-25T12:00:00Z",
  clean: cleanStringInput,
});

export const endTimes = input({
  label: "End Times",
  type: "string",
  required: false,
  comments:
    "Select how many times the meeting should recur before it is canceled. If set to 0, it means there is no end time. The maximum number of recurring is 60. Cannot be used with the 'End Date Time' input.",
  default: "1",
  example: "5",
  placeholder: "5",
  clean: cleanNumberInput,
});

export const hostVideo = input({
  label: "Host Video On Start",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine if the host's video is turned on by default.",
  clean: util.types.toBool,
});

export const participantVideo = input({
  label: "Participant Video",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine if participants video is turned on by default.",
  clean: util.types.toBool,
});

export const joinBeforeHost = input({
  label: "Join Before Host",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine if participants are allowed to join before the host.",
  clean: util.types.toBool,
});

export const jbhTime = input({
  label: "Time To Join Before Host",
  type: "string",
  required: false,
  comments: "If joinBeforeHost is true, supply one of the given values.",
  model: [
    { label: "Anytime", value: "0" },
    { label: "5 Minutes", value: "5" },
    { label: "10 Minutes", value: "10" },
  ],
  clean: cleanStringInput,
});

export const muteUponEntry = input({
  label: "Mute Upon Entry",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine if participants are muted by default when they join.",
  clean: util.types.toBool,
});

export const watermark = input({
  label: "Use Watermark",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine if a watermark will be displayed on screen share.",
  clean: util.types.toBool,
});

export const usePMI = input({
  label: "Use Personal Meeting ID",
  type: "boolean",
  required: false,
  comments:
    "This flag will determine whether or not to use a personal meeting Id, over a generated meeting Id.",
  clean: util.types.toBool,
});

export const approvalType = input({
  label: "Approval Type",
  type: "string",
  required: false,
  comments: "Enable meeting registration approval.",
  default: "2",
  model: [
    { label: "Automatically Approve", value: "0" },
    { label: "Manually Approve", value: "1" },
    { label: "None Required", value: "2" },
  ],
  clean: cleanNumberInput,
});

export const registrationType = input({
  label: "Registration Type",
  type: "string",
  required: false,
  model: [
    {
      label: "Attendees register once and can attend any meeting occurrence.",
      value: "1",
    },
    {
      label: "Attendees must register for each meeting occurrence.",
      value: "2",
    },
    {
      label:
        "Attendees register once and can select one or more meeting occurrences to attend.",
      value: "3",
    },
  ],
  default: "1",
  comments: "This field is only for recurring meetings with fixed times (8).",
  clean: cleanNumberInput,
});

export const audio = input({
  label: "Audio Method",
  type: "string",
  required: false,
  model: [
    { label: "Telephony only", value: "telephony" },
    { label: "VoIP only", value: "voip" },
    { label: "Both telephony and VoIP", value: "both" },
    { label: "Third party audio conference", value: "thirdParty" },
  ],
  default: "both",
  comments: "How participants join the audio portion of the meeting.",
  clean: cleanStringInput,
});

export const autoRecording = input({
  label: "Auto Recording",
  type: "string",
  required: false,
  model: [
    { label: "Record the meeting to the cloud", value: "cloud" },
    { label: "Record the meeting locally", value: "local" },
    { label: "Auto-recording disabled", value: "none" },
  ],
  default: "none",
  comments: "The automatic recording settings.",
  clean: cleanStringInput,
});

export const availableDialInCountries = input({
  label: "Global Dial In Countries",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "US",
  example: "US",
  comments:
    "For each item specify the code of a country that is available for global dial in.",

  clean: cleanStringValueListInput,
});

export const registrationEmailNotifications = input({
  label: "Registration Email Notifications",
  type: "boolean",
  required: false,
  comments:
    "Whether to send registrants email notifications about their registration approval, cancellation, or rejection.",
  clean: util.types.toBool,
});

export const address = input({
  label: "Address",
  type: "string",
  required: false,
  comments: "Provide a string value for the address.",
  example: "122 S Privet dr",
  placeholder: "122 S Privet dr",
  clean: cleanStringInput,
});

export const city = input({
  label: "City",
  type: "string",
  required: false,
  comments: "Provide a string value for the city",
  example: "San Jose",
  placeholder: "San Jose",
  clean: cleanStringInput,
});

export const country = input({
  label: "Country",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the country. Use the format provided by the Zoom API documentation: https://marketplace.zoom.us/docs/api-reference/other-references/abbreviation-lists#countries",
  example: "US",
  placeholder: "US",
  clean: cleanStringInput,
});

export const zip = input({
  label: "Zip Code",
  type: "string",
  required: false,
  comments: "Provide a string value for the zipcode",
  example: "90210",
  placeholder: "90210",
  clean: cleanStringInput,
});

export const state = input({
  label: "State",
  type: "string",
  required: false,
  comments: "Provide a string value for the state or province.",
  example: "California",
  placeholder: "California",
  clean: cleanStringInput,
});

export const phone = input({
  label: "Phone",
  type: "string",
  required: false,
  comments: "Provide a string value for the phone number.",
  example: "15558904949",
  placeholder: "15558904949",
  clean: cleanStringInput,
});

export const industry = input({
  label: "Industry",
  type: "string",
  required: false,
  comments: "Provide a string value for their industry",
  example: "Computer Software",
  placeholder: "Computer Software",
  clean: cleanStringInput,
});

export const org = input({
  label: "Organization",
  type: "string",
  required: false,
  comments: "Provide a string value for the registrant's organization.",
  example: "Acme Inc.",
  placeholder: "Acme Inc.",
  clean: cleanStringInput,
});

export const purchasingTimeFrame = input({
  label: "Purchasing Time Frame",
  type: "string",
  required: false,
  comments: "The registrant's purchasing time frame.",
  model: [
    { label: "Within a month", value: "Within a month" },
    { label: "1-3 months", value: "1-3 months" },
    { label: "4-6 months", value: "4-6 months" },
    { label: "More than 6 months", value: "More than 6 months" },
    { label: "No timeframe", value: "No timeframe" },
  ],
  clean: cleanStringInput,
});

export const roleInPurchaseProcess = input({
  label: "Role In Purchase Process",
  type: "string",
  required: false,
  comments:
    "Provide a string value for the registrants role in the purchase process.",
  model: [
    { label: "Decision Maker", value: "Decision Maker" },
    { label: "Evaluator/Recommender", value: "Evaluator/Recommender" },
    { label: "Influencer", value: "Influencer" },
    { label: "Not Involved", value: "Not Involved" },
  ],
  clean: cleanStringInput,
});

export const numberOfEmployees = input({
  label: "Number Of Employees",
  type: "string",
  required: false,
  comments: "Provide a value form the supplied list.",

  model: [
    { label: "1-20", value: "1-20" },
    { label: "21-50", value: "21-50" },
    { label: "51-100", value: "51-100" },
    { label: "101-500", value: "101-500" },
    { label: "500-1,000", value: "500-1,000" },
    { label: "5,001-10,000", value: "5,001-10,000" },
    { label: "More than 10,000", value: "More than 10,000" },
  ],
  clean: cleanStringInput,
});

export const comments = input({
  label: "Comments",
  type: "string",
  required: false,
  comments: "Provide a string value for comments.",
  example: "These are some example comments.",
  placeholder: "These are some example comments.",
  clean: cleanStringInput,
});

export const webhookSecretToken = input({
  label: "Zoom Webhook Secret Token",
  type: "string",
  required: true,
  comments: "Please provide your Zoom webhook key.",
  example: "x5Wkjt82gfjdhj___",
  placeholder: "x5Wkjt82gfjdhj___",
  clean: cleanStringInput,
});

export const ocurrenceIds = input({
  label: "Occurrence Ids",
  type: "string",
  required: false,
  comments: "A comma-separated list of meeting occurrence IDs.",
  example: "1648194360000,1648367160000",
  placeholder: "1648194360000,1648367160000",
  clean: cleanStringInput,
});

export const language = input({
  label: "Language",
  type: "string",
  required: false,
  comments: "The registrant's language preference for confirmation emails.",
  model: [
    { label: "English (US)", value: "en-US" },
    { label: "German (Germany)", value: "de-DE" },
    { label: "Spanish (Spain)", value: "es-ES" },
    { label: "French (France)", value: "fr-FR" },
    { label: "Japanese", value: "jp-JP" },
    { label: "Portuguese (Portugal)", value: "pt-PT" },
    { label: "Russian", value: "ru-RU" },
    { label: "Chinese (PRC)", value: "zh-CN" },
    { label: "Chinese (Taiwan)", value: "zh-TW" },
    { label: "Korean", value: "ko-KO" },
    { label: "Italian (Italy)", value: "it-IT" },
    { label: "Vietnamese", value: "vi-VN" },
    { label: "Polish", value: "pl-PL" },
    { label: "Turkish", value: "tr-TR" },
  ],
  clean: cleanStringInput,
});

export const autoApprove = input({
  label: "Auto Approve",
  type: "boolean",
  required: false,
  comments:
    "If a meeting was scheduled with the Approval Type field value of 1 (manual approval) but you want to automatically approve meeting registrants, set the value of this field to true.",
  default: "false",
  clean: util.types.toBool,
});

export const customQuestions = input({
  label: "Custom Questions",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Provide an array custom questions for the registrant. Remove the default content if you do not want to include custom questions.",
  default: JSON.stringify(
    [
      {
        title: "What do you hope to learn from this?",
        value:
          "Look forward to learning how you come up with new recipes and what other services you offer.",
      },
    ],
    null,
    2,
  ),
  clean: cleanCodeInput,
});

export const defaultPassword = input({
  label: "Default Password",
  type: "boolean",
  required: false,
  default: "false",
  comments: "Whether to generate a default passcode using the user's settings.",
  clean: util.types.toBool,
});

export const preSchedule = input({
  label: "Pre Schedule",
  type: "boolean",
  required: false,
  comments: "Whether to create a prescheduled meeting via the GSuite app.",
  default: "false",
  clean: util.types.toBool,
});

export const scheduleFor = input({
  label: "Schedule For",
  type: "string",
  required: false,
  comments:
    "The email address or user ID of the user to schedule a meeting for.",
  example: "example@email.com",
  placeholder: "example@email.com",
  clean: cleanStringInput,
});

export const settingsExtraFields = input({
  label: "Settings Extra Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Provide additional fields for the settings object that are not covered by the other inputs. Remove the default content if you do not want to include extra fields. For more information, refer to the Zoom API documentation: https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/meetingCreate",
  default: JSON.stringify(SETTINGS_EXTRA_FIELDS_DEFAULT, null, 2),
  clean: cleanCodeInput,
});

export const templateId = input({
  label: "Template Id",
  type: "string",
  required: false,
  comments:
    "The account admin meeting template ID used to schedule a meeting using a meeting template.",
  example: "AdxbhxCzKgSiWAw",
  placeholder: "AdxbhxCzKgSiWAw",
  clean: cleanStringInput,
});

export const trackingFields = input({
  label: "Tracking Fields",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Information about the meeting's tracking fields. Remove the default content if you do not want to include tracking fields.",
  default: JSON.stringify(TRACKING_FIELDS_DEFAULT, null, 2),
  clean: cleanCodeInput,
});

export const ocurrenceId = input({
  label: "Occurrence Id",
  type: "string",
  required: false,
  comments:
    "Meeting occurrence ID. Provide this field to view meeting details of a particular occurrence of the recurring meeting.",
  example: "1648194360000",
  placeholder: "1648194360000",
  clean: cleanStringInput,
});

export const showPreviousOccurrences = input({
  label: "Show Previous Occurrences",
  type: "boolean",
  required: false,
  comments:
    "Turn this flag ON to view meeting details of all previous occurrences of a recurring meeting.",
  default: "false",
  clean: util.types.toBool,
});

export const includeFields = input({
  label: "Include Fields",
  type: "string",
  required: false,
  comments:
    "The download_access_token value for downloading the meeting's recordings.",
  example: "a2f19f96-9294-4f51-8134-6f0eea108eb2",
  placeholder: "a2f19f96-9294-4f51-8134-6f0eea108eb2",
  clean: cleanStringInput,
});

export const ttl = input({
  label: "Time To Live",
  type: "string",
  required: false,
  comments:
    "The download_access_token Time to Live (TTL) value. This parameter is only valid if the 'Include Fields' input contains the download_access_token value. Min value is 0 and max value is 604800 (7 days).",
  example: "86400",
  placeholder: "86400",
  clean: cleanNumberInput,
});

export const registrantStatus = input({
  label: "Registrant Status",
  type: "string",
  required: false,
  comments: "Query by the registrant's status.",
  model: [
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Denied", value: "denied" },
  ],
  default: "approved",
  clean: cleanStringInput,
});

export const typeOfMeeting = input({
  label: "Type Of Meeting",
  type: "string",
  required: false,
  comments: "Query by the meeting type.",
  model: [
    { label: "Scheduled", value: "scheduled" },
    { label: "Live", value: "live" },
    { label: "Upcoming", value: "upcoming" },
    { label: "Upcoming Meetings", value: "upcoming_meetings" },
    { label: "Previous", value: "previous_meetings" },
  ],
  default: "scheduled",
  clean: cleanStringInput,
});

export const from = input({
  label: "From",
  type: "string",
  required: false,
  comments: "The start date for the query.",
  example: "2023-01-01 or 2023-01-01T00:00:00Z",
  placeholder: "2023-01-01 or 2023-01-01T00:00:00Z",
  clean: cleanStringInput,
});

export const to = input({
  label: "To",
  type: "string",
  required: false,
  comments: "The end date for the query.",
  example: "2023-01-16 or 2023-01-16T00:00:00Z",
  placeholder: "2023-01-16 or 2023-01-16T00:00:00Z",
  clean: cleanStringInput,
});

export const timezoneQuery = input({
  label: "Timezone",
  type: "string",
  required: false,
  comments: "The timezone to assign to the 'From' and 'To' value.",
  example: "America/New_York",
  placeholder: "America/New_York",
  clean: cleanStringInput,
});

export const occurrenceIdQuery = input({
  label: "Occurrence Id",
  type: "string",
  required: false,
  comments: "Meeting occurrence ID.",
  example: "1648194360000",
  placeholder: "1648194360000",
  clean: cleanStringInput,
});

export const displayName = input({
  label: "Display Name",
  type: "string",
  required: false,
  comments: "The user's display name.",
  example: "John Doe",
  placeholder: "John Doe",
  clean: cleanStringInput,
});

export const userPassword = input({
  label: "User Password",
  type: "password",
  required: false,
  comments: `User password. Only used for the "autoCreate" function. The password has to have a minimum of 8 characters and maximum of 32 characters. By default (basic requirement), password must have at least one letter (a, b, c..), at least one number (1, 2, 3...) and include both uppercase and lowercase letters. It should not contain only one identical character repeatedly ('11111111' or 'aaaaaaaa') and it cannot contain consecutive characters ('12345678' or 'abcdefgh').`,
  example: "examplePass1",
  placeholder: "examplePass1",
  clean: cleanStringInput,
});

export const zoomPhone = input({
  label: "Zoom Phone",
  type: "boolean",
  required: false,
  comments: "Whether the user has the Zoom Phone feature enabled.",
  default: "false",
  clean: util.types.toBool,
});

export const zoomOneType = input({
  label: "Zoom One Type",
  type: "string",
  required: false,
  comments: "The type of Zoom One user.",
  model: ZOOM_ONE_TYPES,
  clean: cleanNumberInput,
});

export const zoomOneTypeUpdate = input({
  label: "Zoom One Type",
  type: "string",
  required: false,
  comments: "The Zoom One plan option.",
  model: [ZOOM_ONE_TYPE_OFF, ...ZOOM_ONE_TYPES],
  clean: cleanNumberInput,
});

export const planUnitedType = input({
  label: "Plan United Type",
  type: "string",
  required: false,
  comments: "The type of Plan United user.",
  model: ZOOM_UNITED_PLANS,
  clean: cleanStringInput,
});

export const planUnitedTypeUpdate = input({
  label: "Plan United Type",
  type: "string",
  required: false,
  comments: "The Plan United plan option.",
  model: [ZOOM_UNITED_PLAN_OFF, ...ZOOM_UNITED_PLANS],
  clean: cleanStringInput,
});

export const encryptedEmail = input({
  label: "Encrypted Email",
  type: "boolean",
  required: false,
  comments:
    "Whether the email address passed for the 'User Id' value is an encrypted email address.",
  default: "false",
  clean: util.types.toBool,
});

export const action = input({
  label: "Action",
  type: "string",
  required: false,
  model: [
    { label: "Disassociate", value: "disassociate" },
    { label: "Delete", value: "delete" },
  ],
  default: "disassociate",
  comments: "Delete action options.",
  clean: cleanStringInput,
});

export const transferEmail = input({
  label: "Transfer Email",
  type: "string",
  required: false,
  comments:
    "Transfer email. This field is required if the user has Zoom Events/Sessions feature. After you delete or disassociate the user, the user's hub assets on Zoom Events site will be transferred to the target user.",
  example: "jchill@example.com",
  placeholder: "jchill@example.com",
  clean: cleanStringInput,
});

export const transferMeeting = input({
  label: "Transfer Meeting",
  type: "boolean",
  required: false,
  comments: "Transfer meeting.",
  default: "false",
  clean: util.types.toBool,
});

export const transferWebinar = input({
  label: "Transfer Webinar",
  type: "boolean",
  required: false,
  comments: "Transfer webinar.",
  default: "false",
  clean: util.types.toBool,
});

export const transferRecording = input({
  label: "Transfer Recording",
  type: "boolean",
  required: false,
  comments: "Transfer recording.",
  default: "false",
  clean: util.types.toBool,
});

export const transferWhiteboard = input({
  label: "Transfer Whiteboard",
  type: "boolean",
  required: false,
  comments:
    "When deleting a user, whether to transfer all their Zoom Whiteboard data to another user.",
  default: "false",
  clean: util.types.toBool,
});

export const loginType = input({
  label: "Login Type",
  type: "string",
  required: false,
  comments: "The user's login method.",
  model: LOGIN_TYPES,
  clean: cleanNumberInput,
});

export const searchByUniqueId = input({
  label: "Search By Unique Id",
  type: "boolean",
  required: false,
  comments:
    "Whether the queried 'User Id' value is an employee unique ID. This value defaults to false.",
  default: "false",
  clean: util.types.toBool,
});

export const toContact = input({
  label: "To Contact",
  type: "string",
  required: false,
  comments:
    "This field allows you to query by the email address, user ID, or member ID of a chat contact with whom the user communicated. The API only returns messages sent and received between the user and the queried contact. You must provide either the 'To Contact' or the 'To Channel' query parameter. When you use the 'Search Key' and 'Search Type' parameters, this parameter is optional and not required.",
  example: "jchill@example.com",
  placeholder: "jchill@example.com",
  clean: cleanStringInput,
});

export const toChannel = input({
  label: "To Channel",
  type: "string",
  required: false,
  comments:
    "This field allows you to query by the channel ID of a channel in which the user had chat conversations. The API only returns messages sent and received by the user in the queried channel. You must provide either the 'To Contact' or the 'To Channel' query parameter. When you use the 'Search Key' and 'Search Type' parameters, this parameter is optional and not required. You must provide either the to_contact or the to_channel query parameter. When you call the 'Search Key' and 'Search Type' query parameters, this query parameter is optional and not required.",
  example: "qrstuvwxyz67890",
  placeholder: "qrstuvwxyz67890",
  clean: cleanStringInput,
});

export const date = input({
  label: "Date",
  type: "string",
  required: false,
  comments:
    "The query date from which to retrieve the chat messages. This value defaults to the current date. If you do not provide the 'Date' or 'From' inputs, the API defaults to the 'Date' parameter.",
  example: "2020-03-01",
  placeholder: "2020-03-01",
  clean: cleanStringInput,
});

export const includeDeletedAndEditedMessage = input({
  label: "Include Deleted And Edited Message",
  type: "boolean",
  required: false,
  comments:
    "This field sets the value of this field to true to include edited and deleted messages in the response.",
  default: "false",
  clean: util.types.toBool,
});

export const searchType = input({
  label: "Search Type",
  type: "string",
  required: false,
  comments:
    "The type of search. If you use this input, you must also include a 'Search Key' input value. The 'To Contact' and the 'To Channel' inputs are not required when you use this input. If you do not call them, the API returns all contact and channel messages that match the 'Search Type' input. If you use this parameter, you cannot also query the 'Include Deleted And Edited Message' input. This parameter does not support the return of deleted or updated messages.",
  model: [
    { label: "Search messages", value: "message" },
    { label: "Search files", value: "file" },
  ],
  clean: cleanStringInput,
});

export const searchKey = input({
  label: "Search Key",
  type: "string",
  required: false,
  comments:
    "The query string for messages or files, up to 256 characters. If you use this input, you must also include a 'Search Type' input value. The 'To Contact' and the 'To Channel' inputs are not required when you use this input. If you do not call them, the API returns all contact and channel messages that match the 'Search Key' input. If you use this parameter, you cannot also query the 'Include Deleted And Edited Message' input. This parameter does not support the return of deleted or updated messages.",
  example: "hello",
  placeholder: "hello",
  clean: cleanStringInput,
});

export const excludeChildMessage = input({
  label: "Exclude Child Message",
  type: "boolean",
  required: false,
  comments:
    "This parameter excludes returning all child messages in a chat. It leaves only the parent messages.",
  default: "false",
  clean: util.types.toBool,
});

export const downloadFileFormats = input({
  label: "Download File Formats",
  type: "string",
  required: false,
  comments:
    "This field returns the download URL in the specified format for different types of files. Currently, we only support the download URL in the .mp4 format for audio files. If this parameter is not specified, it returns the download URL of the file in its default format.",
  example: "audio/mp4",
  placeholder: "audio/mp4",
  clean: cleanStringInput,
});

export const userStatus = input({
  label: "User Status",
  type: "string",
  required: false,
  comments: "The user's status.",
  model: [
    { label: "Pending", value: "pending" },
    { label: "Active", value: "active" },
    { label: "Inactive", value: "inactive" },
  ],
  default: "active",
  clean: cleanStringInput,
});

export const roleId = input({
  label: "Role Id",
  type: "string",
  required: false,
  comments:
    "The role's unique ID. Use this parameter to filter the response by a specific role.",
  example: "0",
  placeholder: "0",
  clean: cleanStringInput,
});

export const includeFieldsQuery = input({
  label: "Include Fields",
  type: "string",
  required: false,
  comments: "Display one of the selected attributes.",
  model: [
    { label: "Custom Attributes", value: "custom_attributes" },
    { label: "Host Key", value: "host_key" },
  ],
  clean: cleanStringInput,
});

export const license = input({
  label: "License",
  type: "string",
  required: false,
  comments: "The user's license. Filter the response by a specific license.",
  model: [
    { label: "Zoom Workforce Management", value: "zoom_workforce_management" },
    {
      label: "Zoom Compliance Management",
      value: "zoom_compliance_management",
    },
  ],
  clean: cleanStringInput,
});

export const removeTspCredentials = input({
  label: "Remove TSP Credentials",
  type: "boolean",
  required: false,
  comments: "Whether to remove the user's TSP credentials.",
  default: "false",
  clean: util.types.toBool,
});

export const customAttributes = input({
  label: "Custom Attributes",
  type: "code",
  language: "json",
  required: false,
  default: JSON.stringify(CUSTOM_ATTRIBUTES_DEFAULT, null, 2),
  comments:
    "The user's assigned custom attributes. Remove the default content if you do not want to include custom attributes.",
  clean: cleanCodeInput,
});

export const dept = input({
  label: "Department",
  type: "string",
  required: false,
  comments: "The user's assigned department.",
  example: "Engineering",
  placeholder: "Engineering",
  clean: cleanStringInput,
});

export const groupId = input({
  label: "Group Id",
  type: "string",
  required: false,
  comments:
    "Provide the unique identifier of the group that you would like to add a pending user to.",
  example: "RSMaSp8sTEGK0_oamiA2_w",
  placeholder: "RSMaSp8sTEGK0_oamiA2_w",
  clean: cleanStringInput,
});

export const userLanguage = input({
  label: "User Language",
  type: "string",
  required: false,
  comments: "The user's language.",
  example: "English",
  placeholder: "English",
  clean: cleanStringInput,
});

export const manager = input({
  label: "Manager",
  type: "string",
  required: false,
  comments: "The user's assigned manager.",
  example: "John Doe",
  placeholder: "John Doe",
  clean: cleanStringInput,
});

export const phoneNumbers = input({
  label: "Phone Numbers",
  type: "code",
  language: "json",
  required: false,
  comments:
    "Information about the user's assigned phone numbers. Remove the default content if you do not want to include phone numbers. Allowed label values are: Mobile┃Office┃Home┃Fax",
  default: JSON.stringify(PHONE_NUMBERS_DEFAULT, null, 2),
  clean: cleanCodeInput,
});

export const aboutMe = input({
  label: "About Me",
  type: "string",
  required: false,
  comments:
    "The user's self-introduction. Hyperlinks or HTML code not allowed in this field.",
  example: "I love Zoom!",
  placeholder: "I love Zoom!",
  clean: cleanStringInput,
});

export const linkedinUrl = input({
  label: "LinkedIn URL",
  type: "string",
  required: false,
  comments: "The user's LinkedIn URL.",
  example: "https://www.linkedin.com/in/johndoe",
  placeholder: "https://www.linkedin.com/in/johndoe",
  clean: cleanStringInput,
});

export const pronouns = input({
  label: "Pronouns",
  type: "string",
  required: false,
  comments: "The user's pronouns.",
  example: "He/Him",
  placeholder: "He/Him",
  clean: cleanStringInput,
});

export const pronounsOption = input({
  label: "Pronouns",
  type: "string",
  required: false,
  comments: "The user's pronouns.",
  model: [
    {
      label: "Ask the user every time they join meetings and webinars",
      value: "1",
    },
    { label: "Always display pronouns in meetings and webinars", value: "2" },
    { label: "Do not display pronouns in meetings and webinars", value: "3" },
  ],
  clean: cleanNumberInput,
});

export const sourceId = input({
  label: "Source Id",
  type: "string",
  required: false,
  comments: "The tracking source's unique identifier.",
  example: "4816766181770",
  placeholder: "4816766181770",
  clean: cleanStringInput,
});

export const occurrenceIdWebinar = input({
  label: "Occurrence Id",
  type: "string",
  required: false,
  comments:
    "Unique identifier for an occurrence of a recurring webinar. Recurring webinars can have a maximum of 50 occurrences. ",
  example: "1648538280000",
  placeholder: "1648538280000",
  clean: cleanStringInput,
});

export const showPreviousOccurrencesWebinar = input({
  label: "Show Previous Occurrences",
  type: "boolean",
  required: false,
  comments:
    "Turn this flag ON to view details of all previous occurrences of a recurring webinar.",
  default: "false",
  clean: util.types.toBool,
});

export const occurrenceIdWebinarQuery = input({
  label: "Occurrence Id",
  type: "string",
  required: false,
  comments: "The meeting or webinar occurrence ID.",
  example: "1648194360000",
  placeholder: "1648194360000",
  clean: cleanStringInput,
});

export const trackingSourceId = input({
  label: "Tracking Source Id",
  type: "string",
  required: false,
  comments:
    "The tracking source ID for the registrants. Useful if you share the webinar registration page in multiple locations.",
  example: "5516482804110",
  placeholder: "5516482804110",
  clean: cleanStringInput,
});

export const webinarType = input({
  label: "Webinar Type",
  type: "string",
  required: false,
  comments: "The type of webinar.",
  model: [
    {
      label:
        "All valid previous (unexpired) webinars, live webinars, and upcoming scheduled webinars",
      value: "scheduled",
    },
    {
      label: "All upcoming webinars, including live webinars",
      value: "upcoming",
    },
  ],
  clean: cleanStringInput,
});

export const selectChatMessageInputs = {
  connection,
  userId: {
    ...userId,
    comments: "The user ID whose chat messages to list.",
    dataSource: undefined,
  },
  toContact: {
    ...toContact,
    comments:
      "The contact ID whose chat messages to list. <strong>Note:</strong> You must specify this input or the 'To Channel' input.",
  },
  toChannel: {
    ...toChannel,
    comments:
      "The channel ID whose chat messages to list. <strong>Note:</strong> You must specify this input or the 'To Contact' input.",
  },
  date,
  from: {
    ...from,
    comments:
      "The query start date in yyyy-MM-dd'T'HH:mm:ss'Z' format. If you provide both the 'Date' and 'from' inputs, the API uses the 'Date' input value to query.",
    example: "2021-01-01T00:00:00Z",
  },
  to: {
    ...to,
    comments:
      "The query end date in yyyy-MM-dd'T'HH:mm:ss'Z' format. This value defaults to the current date.",
    example: "2021-01-01T00:00:00Z",
  },
};

export const selectMeetingInputs = {
  connection,
  userId: {
    ...userId,
    comments: "The user ID whose meetings to list.",
    dataSource: undefined,
  },
};

const returnId = input({
  label: "Return ID",
  type: "boolean",
  required: false,
  comments:
    "When enabled, returns the recording file ID instead of the download URL. Use this if you need the file identifier for further processing rather than a direct download link.",
  default: "false",
  clean: util.types.toBool,
});

export const selectMeetingRecordingInputs = {
  connection,
  meetingId: {
    ...meetingId,
    comments: "The meeting ID to list recordings for.",
    dataSource: undefined,
  },
  returnId,
};

export const selectMeetingRegistrantInputs = {
  connection,
  meetingId: {
    ...meetingId,
    comments: "The meeting ID to list registrants for.",
    dataSource: undefined,
  },
};

export const selectPhoneRecordingInputs = {
  connection,
  userId: {
    ...userId,
    comments: "The user ID whose phone recordings to list.",
    dataSource: undefined,
  },
  returnId: {
    ...returnId,
    comments:
      "When enabled, returns the recording file ID instead of the download URL. Use this if you need the file identifier for further processing rather than a direct download link.",
  },
};

export const selectUserChannelInputs = {
  connection,
  userId: {
    ...userId,
    comments: "The user ID whose channels to list.",
    dataSource: undefined,
  },
};

export const selectWebinarInputs = {
  connection,
  userId: {
    ...userId,
    comments: "The user ID whose webinars to list.",
    dataSource: undefined,
  },
};

export const selectWebinarParticipantInputs = {
  connection,
  webinarId: {
    ...webinarId,
    comments: "The past webinar ID to list participants for.",
    dataSource: undefined,
  },
};

export const selectWebinarRegistrantInputs = {
  connection,
  webinarId: {
    ...webinarId,
    comments: "The webinar ID to list registrants for.",
    dataSource: undefined,
  },
};
