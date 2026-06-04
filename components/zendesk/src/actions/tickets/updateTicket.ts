import { action, util } from "@prismatic-io/spectral";
import { createClient } from "../../auth";
import {
  ticketComment,
  ticketCommentHTML,
  ticketStatus,
  tags,
  ticketType,
  ticketSubject,
  ticketId,
  ticketPriority,
  requesterOrganization,
  assigneeEmail,
  assigneeId,
  connectionInput,
  file,
  fileName,
} from "../../inputs";
import { isPriority, isStatus, isType, validateComment } from "../.././helper";
import { createTicketPayload } from "../../examplePayloads";

export const updateTicket = action({
  display: {
    label: "Update Ticket",
    description: "Update a ticket by ID.",
  },
  perform: async (context, params) => {
    const client = createClient({
      zendeskConnection: params.zendeskConnection,
      debug: context.debug.enabled,
    });

    const ticketPriorityString = params.ticketPriority;
    const ticketStatusString = params.ticketStatus;
    const ticketTypeString = params.ticketType;

    let attachment: Record<string, Record<string, unknown>> | undefined;

    if (params.file) {
      if (!params.fileName) {
        throw new Error("Must specify a file name when you attach a file");
      }
      attachment = (await client.attachments.upload(params.file.data, {
        filename: params.fileName,
        binary: true,
      })) as Record<string, Record<string, unknown>>;
    }

    const { result } = await client.tickets.update(
      util.types.toInt(params.ticketId),
      {
        ticket: {
          assignee_id: util.types.isInt(params.assigneeId)
            ? util.types.toInt(params.assigneeId)
            : undefined,
          assignee_email:
            util.types.toString(params.assigneeEmail) || undefined,
          priority: (isPriority(ticketPriorityString)
            ? ticketPriorityString
            : undefined) as undefined,
          organization_id:
            util.types.toInt(params.requesterOrganization) || undefined,

          comment: validateComment({
            bodyValue: params.ticketComment,
            htmlValue: params.ticketCommentHTML,
            attachment,
          }),

          status: (isStatus(ticketStatusString)
            ? ticketStatusString
            : undefined) as undefined,
          tags:
            params.tags?.map((tag) => util.types.toString(tag)) || undefined,
          type: (isType(ticketTypeString)
            ? ticketTypeString
            : undefined) as undefined,
          subject: util.types.toString(params.ticketSubject) || undefined,
        },
      },
    );

    return {
      data: result,
    };
  },
  inputs: {
    ticketId,
    ticketComment,
    ticketCommentHTML,
    file,
    fileName,
    ticketStatus,
    assigneeEmail: { ...assigneeEmail, required: false },
    assigneeId: { ...assigneeId, required: false },
    tags,
    ticketType,
    ticketSubject,
    ticketPriority,
    requesterOrganization,
    zendeskConnection: connectionInput,
  },
  examplePayload: {
    data: createTicketPayload as unknown,
  },
});
