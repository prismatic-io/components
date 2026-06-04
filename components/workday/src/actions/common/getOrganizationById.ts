import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { SERVICES } from "../../constants";
import { getOrganizationByIdExamplePayload } from "../../examplePayloads";
import { getOrganizationByIdInputs } from "../../inputs";

export const getOrganizationById = action({
  display: {
    label: "Get Organization by ID",
    description: "Retrieves an Organization by ID.",
  },
  perform: async (context, { connection, organizationId }) => {
    const client = getClient(connection, context.debug.enabled);
    const { data } = await client.get(
      `${SERVICES.common}/organizations/${organizationId}`,
    );
    return {
      data,
    };
  },
  inputs: getOrganizationByIdInputs,
  examplePayload: getOrganizationByIdExamplePayload,
});
