import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listServiceDeskOrganizationsExamplePayload } from "../../examplePayloads";
import { listServiceDeskOrganizationsInputs } from "../../inputs";
import type { Organization } from "../../types";
import { getPaginatedData } from "../../util";

export const listServiceDeskOrganizations = action({
  display: {
    label: "List Service Desk Organizations",
    description: "Returns organizations linked to a service desk.",
  },
  inputs: listServiceDeskOrganizationsInputs,
  perform: async (
    context,
    { connection, serviceDeskId, start, limit, fetchAll },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    const { data } = await getPaginatedData<Organization>(
      client,
      `/servicedesk/${serviceDeskId}/organization`,
      fetchAll,
      { params: { start, limit } },
    );
    return { data };
  },
  examplePayload: listServiceDeskOrganizationsExamplePayload,
});
