import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listOrganizationsExamplePayload } from "../../examplePayloads";
import { listOrganizationsInputs } from "../../inputs";
import type { Organization } from "../../types";
import { getPaginatedData } from "../../util";

export const listOrganizations = action({
  display: {
    label: "List Organizations",
    description:
      "Returns all organizations in the Jira Service Management instance.",
  },
  inputs: listOrganizationsInputs,
  perform: async (context, { connection, start, limit, fetchAll }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<Organization>(
      client,
      "/organization",
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listOrganizationsExamplePayload,
});
