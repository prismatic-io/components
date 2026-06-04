import { input, util } from "@prismatic-io/spectral";
import { connection } from "../common";
import { groupId, responderId, ticketId, workspaceId } from "./common";

export const moveTicketInputs = {
  connection,
  ticketId: input({ ...ticketId, comments: "ID of the ticket to move." }),
  workspaceId: input({
    ...workspaceId,
    comments: "ID of the workspace to move the ticket to.",
    required: true,
    clean: util.types.toNumber,
  }),
  groupId,
  responderId,
};
