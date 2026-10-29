import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  actionName,
  actor,
  agentPlatform,
  connection,
  contentId,
  contentProperties,
  contentTitle,
  contentUrl,
  crmContext,
  eventId,
  eventInfoUrl,
  eventProperties,
  eventTimestamp,
  mobileAppId,
  moreInfoUrl,
  nonCompanyParticipants,
  reportingSystem,
  shareId,
  sharer,
  sharingMessageBody,
  sharingMessageSubject,
  userAgent,
  workspaceId,
} from "../../inputs";

export const customActionEvent = action({
  display: {
    label: "Custom Action Event",
    description:
      "Push engagement events into Gong and display them as events in Gong's activity timeline, when a content is engaged by an external participant (for example, a contract was 'signed' by the prospect)",
  },
  perform: async (context, { connection, ...params }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(`/v2/customer-engagement/action`, params);
    return { data };
  },
  inputs: {
    connection,
    reportingSystem,
    eventTimestamp,
    eventId,
    contentId,
    contentUrl,
    contentTitle,
    actionName,
    eventInfoUrl,
    actor,
    crmContext,
    contentProperties,
    eventProperties,
    userAgent,
    mobileAppId,
    agentPlatform,
    workspaceId,
    nonCompanyParticipants,
    moreInfoUrl,
    shareId,
    sharer,
    sharingMessageSubject,
    sharingMessageBody,
  },
  examplePayload: {
    data: {
      requestId: "4al018gzaztcr8nbukw",
      integrationId: 55170271882342,
    },
  },
});
