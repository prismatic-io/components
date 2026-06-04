import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { createRecordExamplePayload } from "../../examplePayloads";
import { createRecordInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const createRecord = action({
  display: {
    label: "Create Record",
    description: "Create a new record of a given type.",
  },
  inputs: createRecordInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const recordId = await legacyClient.create(
        params.model,
        params.parameters,
        params.externalId,
      );
      return { data: recordId };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const { data: created } = await odooClient.post<number[]>(
      `/json/2/${params.model}/create`,
      { vals_list: [params.parameters] },
    );
    const recordId = created[0];
    if (typeof recordId !== "number") {
      throw new Error(
        `Odoo did not return an ID for the newly created "${params.model}" record.`,
      );
    }
    if (params.externalId) {
      const trimmed = params.externalId.trim();
      const separatorIndex = trimmed.indexOf(".");
      if (separatorIndex <= 0 || separatorIndex === trimmed.length - 1) {
        throw new Error(
          `External ID "${params.externalId}" is not in the expected "module.name" format.`,
        );
      }
      await odooClient.post("/json/2/ir.model.data/create", {
        vals_list: [
          {
            module: trimmed.slice(0, separatorIndex),
            name: trimmed.slice(separatorIndex + 1),
            model: params.model,
            res_id: recordId,
          },
        ],
      });
    }
    return { data: recordId };
  },
  examplePayload: createRecordExamplePayload,
});
