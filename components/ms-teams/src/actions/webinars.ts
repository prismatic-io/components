import { action } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  listAttendanceRecordsExamplePayload,
  getSessionAttendanceReportExamplePayload,
  listSessionAttendanceReportsExamplePayload,
  getWebinarSessionExamplePayload,
  listWebinarSessionsExamplePayload,
  listWebinarsExamplePayload,
  createWebinarRegistrationExamplePayload,
  cancelWebinarRegistrationExamplePayload,
  getWebinarRegistrationExamplePayload,
  listWebinarRegistrationsExamplePayload,
  getWebinarExamplePayload,
  cancelWebinarExamplePayload,
  publishWebinarExamplePayload,
  createWebinarExamplePayload,
} from "../examplePayloads";
import {
  audience,
  coOrganizers,
  connection,
  expand,
  fetchAll,
  filter,
  orderBy,
  role,
  search,
  select,
  sessionId,
  settings,
  skipToken,
  timeout,
  top,
  webinarDescriptionContent,
  webinarDescriptionContentType,
  webinarDisplayName,
  webinarEndDateTime,
  webinarId,
  webinarStartDateTime,
  webinarTimeZone,
} from "../inputs";
import { paginateResults } from "../utils";

const listAttendanceRecords = action({
  display: {
    label: "List Attendance Records",
    description: "List all Attendance Records for a given Attendance Report",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `/solutions/virtualEvents/webinars/${params.webinarId}/sessions/${params.sessionId}/attendanceReports/${params.reportId}/attendanceRecords`,
      params.fetchAll,
      {
        params: {
          $top: params.top || undefined,
          $skipToken: params.skipToken || undefined,
          $filter: params.filter || undefined,
          $orderby: params.orderBy || undefined,
          $search: params.search || undefined,
          $select: params.select || undefined,
          $expand: params.expand || undefined,
        },
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    webinarId,
    sessionId,
    reportId: { label: "Report ID", required: true, type: "string" },
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
    expand,
  },
  examplePayload: listAttendanceRecordsExamplePayload,
});

const getSessionAttendanceReport = action({
  display: {
    label: "Get Webinar Session Attendance Report",
    description: "Get a Session Attendance Report for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/solutions/virtualEvents/webinars/${params.webinarId}/sessions/${params.sessionId}/attendanceReports/${params.reportId}`,
      {
        params: {
          $top: params.top || undefined,
          $skipToken: params.skipToken || undefined,
          $filter: params.filter || undefined,
          $orderby: params.orderBy || undefined,
          $search: params.search || undefined,
          $select: params.select || undefined,
          $expand: params.expand || undefined,
        },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId,
    sessionId,
    reportId: { label: "Report ID", required: true, type: "string" },
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
    expand,
  },
  examplePayload: getSessionAttendanceReportExamplePayload,
});

const listSessionAttendanceReports = action({
  display: {
    label: "List Webinar Session Attendance Reports",
    description: "List all Session Attendance Reports for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const data = await paginateResults(
      client,
      `/solutions/virtualEvents/webinars/${params.webinarId}/sessions/${params.sessionId}/attendanceReports`,
      params.fetchAll,
      {
        params: {
          $top: params.top || undefined,
          $skipToken: params.skipToken || undefined,
          $filter: params.filter || undefined,
          $orderby: params.orderBy || undefined,
          $search: params.search || undefined,
          $select: params.select || undefined,
        },
      },
    );

    return { data };
  },
  inputs: {
    connection,
    fetchAll,
    webinarId,
    sessionId,
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
  },
  examplePayload: listSessionAttendanceReportsExamplePayload,
});

const getWebinarSession = action({
  display: {
    label: "Get Webinar Session",
    description: "Get a webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const endpointUrl = `/solutions/virtualEvents/webinars/${params.webinarId}/sessions/${params.sessionId}`;

    const { data } = await client.get(endpointUrl);
    return { data };
  },
  inputs: {
    connection,
    webinarId,
    sessionId,
  },
  examplePayload: getWebinarSessionExamplePayload,
});

const listWebinarSessions = action({
  display: {
    label: "List Webinar Sessions",
    description: "List all Sessions for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );

    const { data } = await client.get(
      `/solutions/virtualEvents/webinars/${params.webinarId}/sessions`,
      {
        params: {
          $top: params.top || undefined,
          $skipToken: params.skipToken || undefined,
          $filter: params.filter || undefined,
          $orderby: params.orderBy || undefined,
          $search: params.search || undefined,
          $select: params.select || undefined,
          $expand: params.expand || undefined,
        },
      },
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId,
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
    expand,
  },
  examplePayload: listWebinarSessionsExamplePayload,
});

const listWebinars = action({
  display: {
    label: "List Webinars",
    description: "List all webinars",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      params.timeout,
      context.debug.enabled,
    );
    let endpointUrl = "/solutions/virtualEvents/webinars";
    if (params.role) {
      endpointUrl += `/getByUserRole(role='${params.role}')`;
    }

    const { data } = await client.get(endpointUrl, {
      params: {
        $top: params.top || undefined,
        $skipToken: params.skipToken || undefined,
        $filter: params.filter || undefined,
        $orderby: params.orderBy || undefined,
        $search: params.search || undefined,
        $select: params.select || undefined,
        $exapnd: params.expand || undefined,
      },
    });
    return { data };
  },
  inputs: {
    connection,
    role,
    timeout,
    top,
    skipToken,
    filter,
    orderBy,
    search,
    select,
    expand,
  },
  examplePayload: listWebinarsExamplePayload,
});

const createWebinarRegistration = action({
  display: {
    label: "Create Webinar Registration",
    description: "Create a new Registration for a given Webinar",
  },
  perform: async (
    context,
    {
      connection,
      webinarId,
      externalRegistrationInformation,
      registrationQuestionAnswers,
      ...params
    },
  ) => {
    const client = await createClient(
      connection,
      undefined,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/solutions/virtualEvents/webinars/${webinarId}/registrations`,
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: params.email,
        preferredLanguage: params.preferredLanguage
          ? params.preferredLanguage
          : undefined,
        preferredTimezone: params.preferredTimezone
          ? params.preferredTimezone
          : undefined,
        externalRegistrationInformation: externalRegistrationInformation
          ? externalRegistrationInformation
          : undefined,
        registrationQuestionAnswers: registrationQuestionAnswers
          ? registrationQuestionAnswers
          : undefined,
      },
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId: { label: "Webinar ID", type: "string", required: true },
    firstName: { label: "First Name", type: "string", required: true },
    lastName: { label: "Last Name", type: "string", required: true },
    email: { label: "Email", type: "string", required: true },
    externalRegistrationInformation: {
      label: "External Registration Information",
      type: "code",
      language: "json",
      example: JSON.stringify(
        {
          referrer: "referrer-id",
          registrationId: "external-registration-id",
        },
        null,
        2,
      ),
    },
    registrationQuestionAnswers: {
      label: "Registration Question Answers",
      type: "code",
      language: "json",
      example: JSON.stringify(
        {
          questionId: "String",
          displayName: "String",
          value: "String",
          booleanValue: "Boolean",
          multiChoiceValues: ["String"],
        },
        null,
        2,
      ),
    },
    preferredLanguage: {
      label: "Preferred Language",
      type: "string",
      example: "en-us",
      default: "en-us",
      required: true,
    },
    preferredTimezone: {
      label: "Preferred Timezone",
      example: "Mountain Standard Time",
      type: "string",
      required: true,
    },
  },
  examplePayload: createWebinarRegistrationExamplePayload,
});

const cancelWebinarRegistration = action({
  display: {
    label: "Cancel Webinar Registration",
    description: "Cancel a Registration for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/solutions/virtualEvents/webinars/${params.webinarId}/registrations/${params.registrationId}/cancel`,
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId: { label: "Webinar ID", type: "string", required: true },
    registrationId: {
      label: "Registration ID",
      type: "string",
      required: true,
    },
  },
  examplePayload: cancelWebinarRegistrationExamplePayload,
});

const getWebinarRegistration = action({
  display: {
    label: "Get Webinar Registration",
    description: "Get a Registration for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/solutions/virtualEvents/webinars/${params.webinarId}/registrations/${params.registrationId}`,
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId: { label: "Webinar ID", type: "string", required: true },
    registrationId: {
      label: "Registration ID",
      type: "string",
      required: true,
    },
  },
  examplePayload: getWebinarRegistrationExamplePayload,
});

const listWebinarRegistrations = action({
  display: {
    label: "List Webinar Registrations",
    description: "List all Registrations for a given Webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const { data } = await client.get(
      `/solutions/virtualEvents/webinars/${params.webinarId}/registrations`,
    );
    return { data };
  },
  inputs: {
    connection,
    webinarId: { label: "Webinar ID", type: "string", required: true },
  },
  examplePayload: listWebinarRegistrationsExamplePayload,
});

const getWebinar = action({
  display: {
    label: "Get Webinar",
    description: "Get a webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const endpointUrl = `/solutions/virtualEvents/webinars/${params.webinarId}`;

    const { data } = await client.get(endpointUrl);
    return { data };
  },
  inputs: {
    connection,
    webinarId,
  },
  examplePayload: getWebinarExamplePayload,
});

const cancelWebinar = action({
  display: {
    label: "Cancel Webinar",
    description: "Cancel a webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const endpointUrl = `/solutions/virtualEvents/webinars/${params.webinarId}/cancel`;

    const { data } = await client.post(endpointUrl);
    return { data };
  },
  inputs: {
    connection,
    webinarId,
  },
  examplePayload: cancelWebinarExamplePayload,
});

const publishWebinar = action({
  display: {
    label: "Publish Webinar",
    description: "Publish a webinar",
  },
  perform: async (context, params) => {
    const client = await createClient(
      params.connection,
      undefined,
      context.debug.enabled,
    );
    const endpointUrl = `/solutions/virtualEvents/webinars/${params.webinarId}/publish`;

    const { data } = await client.post(endpointUrl);
    return { data };
  },
  inputs: {
    connection,
    webinarId,
  },
  examplePayload: publishWebinarExamplePayload,
});

const createWebinar = action({
  display: {
    label: "Create Webinar",
    description: "Create a new Microsoft Teams Webinar.",
  },
  inputs: {
    connection,
    displayName: webinarDisplayName,
    descriptionContentType: webinarDescriptionContentType,
    descriptionContent: webinarDescriptionContent,
    startDateTime: webinarStartDateTime,
    endDateTime: webinarEndDateTime,
    timeZone: webinarTimeZone,
    audience,
    coOrganizers,
    settings,
  },
  perform: async (
    context,
    {
      connection,
      displayName,
      descriptionContentType,
      descriptionContent,
      startDateTime,
      endDateTime,
      timeZone,
      audience,
      coOrganizers,
      settings,
    },
  ) => {
    const client = await createClient(
      connection,
      undefined,
      context.debug.enabled,
    );
    const body = {
      displayName,
      description: {
        contentType: descriptionContentType,
        content: descriptionContent,
      },
      startDateTime: {
        dateTime: startDateTime,
        timeZone,
      },
      endDateTime: {
        dateTime: endDateTime,
        timeZone,
      },
      audience,
      coOrganizers,
      settings,
    };

    const { data } = await client.post(
      "/solutions/virtualEvents/webinars",
      body,
    );

    return { data };
  },
  examplePayload: createWebinarExamplePayload,
});

export default {
  getWebinar,
  publishWebinar,
  cancelWebinar,
  listWebinars,
  createWebinar,
  getWebinarRegistration,
  createWebinarRegistration,
  cancelWebinarRegistration,
  listWebinarRegistrations,
  getWebinarSession,
  listWebinarSessions,
  getSessionAttendanceReport,
  listSessionAttendanceReports,
  listAttendanceRecords,
};
