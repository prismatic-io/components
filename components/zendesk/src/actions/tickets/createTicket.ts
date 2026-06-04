import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import {
  requesterName,
  requesterEmail,
  recipientEmail,
  ticketComment,
  ticketCommentHTML,
  ticketStatus,
  tags,
  ticketType,
  ticketSubject,
  ticketPriority,
  requesterOrganization,
  followers,
  assigneeId,
  connectionInput,
} from "../../inputs";
import { isPriority, isStatus, isType, validateComment } from "../../helper";
import { createTicketPayload } from "../../examplePayloads";

export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new ticket.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const ticketPriority = util.types.toString(params.ticketPriority);
    const ticketStatusString = util.types.toString(params.ticketStatus);
    const ticketTypeString = util.types.toString(params.ticketType);

    const { result } = await client.tickets.create({
      ticket: {
        requester: {
          name: util.types.toString(params.requesterName),
          email: util.types.toString(params.requesterEmail),
        },
        recipient: util.types.toString(params.recipientEmail),
        assignee_id: util.types.isInt(params.assigneeId)
          ? util.types.toInt(params.assigneeId)
          : undefined,

        priority: (isPriority(ticketPriority)
          ? ticketPriority
          : undefined) as undefined,
        organization_id:
          util.types.toInt(params.requesterOrganization) || undefined,
        follower_ids:
          params.followers?.map((follower) => util.types.toInt(follower)) ||
          undefined,

        comment: validateComment({
          bodyValue: params.ticketComment,
          htmlValue: params.ticketCommentHTML,
        }),

        status: (isStatus(ticketStatusString)
          ? ticketStatusString
          : undefined) as undefined,
        tags: params.tags?.map((tag) => util.types.toString(tag)) || undefined,
        type: (isType(ticketTypeString)
          ? ticketTypeString
          : undefined) as undefined,
        subject: util.types.toString(params.ticketSubject) || undefined,
        external_id: util.types.toString(params.externalId) || undefined,
      },
    });

    return {
      data: result,
    };
  },
  inputs: {
    requesterName,
    requesterEmail,
    assigneeId,
    recipientEmail,
    ticketSubject,
    ticketPriority,
    ticketStatus,
    ticketComment,
    ticketCommentHTML,
    tags,
    ticketType,
    requesterOrganization,
    followers,
    zendeskConnection: connectionInput,
    externalId: input({
      label: "External ID",
      type: "string",
      required: false,
      comments: "The ID of this issue from an external system",
    }),
  },
  examplePayload: {
    data: createTicketPayload as unknown,
  },
});
