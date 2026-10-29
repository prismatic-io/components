import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  actionName,
  agentPlatform,
  connection,
  contentId,
  contentProperties,
  contentTitle,
  contentUrl,
  crmContext,
  eventId,
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
  viewActionTitle,
  viewer,
  viewInfoUrl,
  workspaceId,
} from "../../inputs";

export const customViewedEvent = action({
  display: {
    label: "Custom Viewed Event",
    description:
      "Push engagement events into Gong and display them as events in Gong's activity timeline, when a Gong user shares content with external participants (for example, a contract was “shared” by the account executive with his prospects)",
  },
  perform: async (context, { connection, ...params }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.put(
      `/v2/customer-engagement/content/viewed`,
      params,
    );
    return { data };
  },
  inputs: {
    connection,
    reportingSystem,
    eventTimestamp,
    eventId,
    contentId: {
      ...contentId,
      required: true,
      comments:
        "The id of the content that was shared in the reporting system.",
    },
    contentUrl: {
      ...contentUrl,
      required: true,
      comments:
        "The url of the content that was shared in the reporting system. This is the url that is was accessed by the viewer.",
    },
    contentTitle: {
      ...contentTitle,
      required: true,
      comments: "Human readable title of the content.",
    },
    viewActionTitle,
    shareId,
    viewInfoUrl,
    viewer,
    crmContext,
    contentProperties,
    eventProperties,
    userAgent,
    mobileAppId,
    agentPlatform,
    workspaceId,
    nonCompanyParticipants,
    moreInfoUrl,
    actionName,
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
