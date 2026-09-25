import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import { createTicketExamplePayload } from "../../examplePayloads";
import { createTicketInputs } from "../../inputs";
import { createTicketOutputSchema } from "../../outputSchemas";
import { isPriority, isStatus, isType, validateComment } from "../../util";
export const createTicket = action({
  display: {
    label: "Create Ticket",
    description: "Create a new ticket.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });
    const { ticketPriority, ticketStatus, ticketType } = params.classification;
    const { result } = await client.tickets.create({
      ticket: {
        requester: {
          name: params.requesterName,
          email: params.requesterEmail,
        },
        recipient: util.types.toString(params.recipientEmail),
        assignee_id: util.types.isInt(params.assigneeId)
          ? util.types.toInt(params.assigneeId)
          : undefined,
        priority: (isPriority(ticketPriority)
          ? ticketPriority
          : undefined) as undefined,
        organization_id: params.requesterOrganization,
        follower_ids:
          params.followers?.map((follower) => util.types.toInt(follower)) ||
          undefined,
        comment: validateComment({
          bodyValue: params.ticketComment,
          htmlValue: params.ticketCommentHTML,
        }),
        status: (isStatus(ticketStatus)
          ? ticketStatus
          : undefined) as undefined,
        tags: params.tags,
        type: (isType(ticketType)
          ? ticketType?.toLowerCase()
          : undefined) as undefined,
        subject: params.ticketSubject,
        external_id: params.externalId,
      },
    });
    return {
      data: result,
    };
  },
  examplePerform: async (
    _context,
    params,
  ): Promise<{
    data: unknown;
  }> => {
    const {
      ticketPriority: priority,
      ticketStatus: status,
      ticketType: type,
    } = params.classification;
    const subject = params.ticketSubject;
    const recipient = params.recipientEmail;
    const externalId = params.externalId;
    const organizationId = params.requesterOrganization;
    return {
      data: {
        ...createTicketExamplePayload.data,
        ...(subject ? { subject } : {}),
        ...(recipient ? { recipient } : {}),
        ...(externalId ? { external_id: externalId } : {}),
        ...(isPriority(priority) ? { priority } : {}),
        ...(isStatus(status) ? { status } : {}),
        ...(isType(type) ? { type: type?.toLowerCase() } : {}),
        ...(organizationId ? { organization_id: organizationId } : {}),
        ...(util.types.isInt(params.assigneeId)
          ? { assignee_id: util.types.toInt(params.assigneeId) }
          : {}),
        ...(params.tags?.length
          ? { tags: params.tags.map((tag) => util.types.toString(tag)) }
          : {}),
        ...(params.followers?.length
          ? {
              follower_ids: params.followers.map((follower) =>
                util.types.toInt(follower),
              ),
            }
          : {}),
      },
    };
  },
  inputs: createTicketInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTicketOutputSchema,
  }),
  examplePayload: createTicketExamplePayload,
});
