import { action, outputSchema } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { paginateResults } from "../../util/pagination";
import { listOrganizationsExamplePayload } from "../../examplePayloads";
import { listOrganizationsInputs } from "../../inputs";
import { listOrganizationsOutputSchema } from "../../outputSchemas";

export const listOrganizations = action({
  display: {
    label: "List Organizations",
    description: "Retrieves a list of organizations.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      organizationTypeId,
      extraParameters,
      fetchAll,
      pagination = {},
    },
  ) => {
    const client = getClient(connection, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: `${SERVICES.common}/organizations`,
      params: { organizationType: organizationTypeId, ...extraParameters },
      fetchAll,
      limit: pagination.limit,
      offset: pagination.offset,
    });
  },
  examplePerform: async () => listOrganizationsExamplePayload,
  inputs: listOrganizationsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listOrganizationsOutputSchema,
  }),
  examplePayload: listOrganizationsExamplePayload,
});
