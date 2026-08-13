import { action, outputSchema } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { IR_MODEL_DATA } from "../../constants";
import { setExternalIdExamplePayload } from "../../examplePayloads";
import { setExternalIdInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";
import { json2Path } from "../../util";
import { setExternalIdOutputSchema } from "../../outputSchemas";
export const setExternalId = action({
  display: {
    label: "Set External ID",
    description: "Add an external ID to a record that does not have one.",
  },
  inputs: setExternalIdInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: setExternalIdOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await legacyClient.createExternalId(
        params.model,
        params.id,
        params.externalId,
      );
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const trimmed = params.externalId.trim();
    const separatorIndex = trimmed.indexOf(".");
    if (separatorIndex <= 0 || separatorIndex === trimmed.length - 1) {
      throw new Error(
        `External ID "${params.externalId}" is not in the expected "module.name" format.`,
      );
    }
    const { data: created } = await odooClient.post<number[]>(
      json2Path(IR_MODEL_DATA, "create"),
      {
        vals_list: [
          {
            module: trimmed.slice(0, separatorIndex),
            name: trimmed.slice(separatorIndex + 1),
            model: params.model,
            res_id: params.id,
          },
        ],
      },
    );
    return { data: created[0] };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => setExternalIdExamplePayload,
  examplePayload: setExternalIdExamplePayload,
});
