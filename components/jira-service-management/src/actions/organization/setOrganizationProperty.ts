import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { setOrganizationPropertyExamplePayload } from "../../examplePayloads";
import { setOrganizationPropertyInputs } from "../../inputs";

export const setOrganizationProperty = action({
  display: {
    label: "Set Organization Property",
    description:
      "Stores a custom JSON value against an organization under the specified property key.",
  },
  inputs: setOrganizationPropertyInputs,
  perform: async (
    context,
    { connection, organizationId, propertyKey, propertyValue },
  ) => {
    const { client } = await createClient(connection, context.debug.enabled);
    await client.put(
      `/organization/${organizationId}/property/${encodeURIComponent(propertyKey)}`,
      propertyValue,
    );
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: setOrganizationPropertyExamplePayload,
});
