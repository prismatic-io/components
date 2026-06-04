import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listServiceDesksExamplePayload } from "../../examplePayloads";
import { listServiceDesksInputs } from "../../inputs";
import type { ServiceDesk } from "../../types";
import { getPaginatedData } from "../../util";

export const listServiceDesks = action({
  display: {
    label: "List Service Desks",
    description:
      "Returns all service desks in the Jira Service Management instance.",
  },
  inputs: listServiceDesksInputs,
  perform: async (context, { connection, start, limit, fetchAll }) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<ServiceDesk>(
      client,
      "/servicedesk",
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listServiceDesksExamplePayload,
});
