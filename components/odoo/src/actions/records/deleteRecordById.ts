import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { deleteRecordByIdExamplePayload } from "../../examplePayloads";
import { deleteRecordByIdInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const deleteRecordById = action({
  display: {
    label: "Delete Record By ID",
    description: "Delete a record by its numerical ID.",
  },
  inputs: deleteRecordByIdInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const data = await legacyClient.delete(params.model, params.id);
      return { data };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const { data } = await odooClient.post<boolean>(
      `/json/2/${params.model}/unlink`,
      { ids: [params.id] },
    );
    return { data };
  },
  examplePayload: deleteRecordByIdExamplePayload,
});
