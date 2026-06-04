import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { listModelFieldsExamplePayload } from "../../examplePayloads";
import { listModelFieldsInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const listModelFields = action({
  display: {
    label: "List Model Fields",
    description: "List all fields for a given model.",
  },
  inputs: listModelFieldsInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await legacyClient.getFields(params.model);
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const { data } = await odooClient.post<Record<string, unknown>>(
      `/json/2/${params.model}/fields_get`,
      { allfields: [], attributes: [] },
    );
    return { data };
  },
  examplePayload: listModelFieldsExamplePayload,
});
