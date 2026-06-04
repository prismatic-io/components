import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { updateRecordExamplePayload } from "../../examplePayloads";
import { updateRecordInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const updateRecord = action({
  display: {
    label: "Update Record",
    description: "Update an existing record of a given type.",
  },
  inputs: updateRecordInputs,
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
      `/json/2/${params.model}/write`,
      { ids: [params.id], vals: params.parameters },
    );
    return { data };
  },
  examplePayload: updateRecordExamplePayload,
});
