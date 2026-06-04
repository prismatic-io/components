import { action } from "@prismatic-io/spectral";
import { getCalendlyClient } from "../../client";
import { connection, uuid, email, sort, status } from "../../inputs";
import { listOrganizationInvitationsExamplePayload } from "../../examplePayloads";
import { paginator } from "../../util";

export const listOrganizationInvitations = action({
  display: {
    label: "List Organization Invitations",
    description:
      "Returns a list of Organization Invitations that were sent to the organization's members.",
  },
  perform: async (context, { connection, uuid, email, sort, status }) => {
    const client = getCalendlyClient(connection, context.debug.enabled);
    const data = await paginator(client, `/organizations/${uuid}/invitations`, {
      email: email || undefined,
      sort: sort || undefined,
      status: status || undefined,
    });

    return { data };
  },
  inputs: {
    connection,
    uuid,
    email: {
      ...email,
      required: false,
      comments: "Indicates if the results should be filtered by email address",
    },
    sort,
    status: {
      ...status,
      required: false,
      comments:
        'Indicates if the results should be filtered by status ("pending", "accepted", or "declined")',
      model: [
        {
          value: "",
          label: "",
        },
        {
          value: "pending",
          label: "Pending",
        },
        {
          value: "accepted",
          label: "Accepted",
        },
        {
          value: "declined",
          label: "Declined",
        },
      ],
    },
  },
  examplePayload: listOrganizationInvitationsExamplePayload,
});
