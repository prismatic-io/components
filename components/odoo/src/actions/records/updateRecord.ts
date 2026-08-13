import { action, outputSchema } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { updateRecordExamplePayload } from "../../examplePayloads";
import { updateRecordInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";
import { json2Path } from "../../util";
import { updateRecordOutputSchema } from "../../outputSchemas";
export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update an existing record of a given type.",
  },
  inputs: updateRecordInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateRecordOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await legacyClient.update(
        params.model,
        params.id,
        params.parameters,
      );
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const { data } = await odooClient.post<boolean>(
      json2Path(params.model, "write"),
      { ids: [params.id], vals: params.parameters },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => updateRecordExamplePayload,
  examplePayload: updateRecordExamplePayload,
});
