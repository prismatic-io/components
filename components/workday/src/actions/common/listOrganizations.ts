import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { listOrganizationsExamplePayload } from "../../examplePayloads";
import { listOrganizationsInputs } from "../../inputs";

export const listOrganizations = action({
  display: {
    label: "List Organizations",
    description: "Retrieves list of Organizations.",
  },
  perform: async (context, { connection, params }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(`${SERVICES.common}/organizations`, {
      params,
    });
    return {
      data,
    };
  },
  inputs: listOrganizationsInputs,
  examplePayload: listOrganizationsExamplePayload,
});
