import { action } from "@prismatic-io/spectral";
import { createClient, validateV2Connection } from "../client";
import { category, companyId, connectionInput } from "../inputs";

export const listCustomFields = action({
  display: {
    label: "List Custom Fields",
    description: "Get All Custom Fields for the selected company",
  },
  inputs: {
    connectionInput,
    companyId,
    category,
  },
  perform: async (context, { connectionInput, category, companyId }) => {
    validateV2Connection(connectionInput);
    const client = await createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/companies/${companyId}/customfields/${category}`,
    );
    return {
      data,
    };
  },
});
