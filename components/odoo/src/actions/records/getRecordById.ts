import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { getRecordByIdExamplePayload } from "../../examplePayloads";
import { getRecordByIdInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const getRecordById = action({
  display: {
    label: "Get Record By ID",
    description: "Fetch a record by its numerical ID.",
  },
  inputs: getRecordByIdInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const [record] = await legacyClient.read<Record<string, unknown>>(
        params.model,
        [params.id],
      );
      if (!record) {
        throw new Error(
          `No such "${params.model}" record with ID "${params.id}" exists.`,
        );
      }
      return { data: record };
    }
    const odooClient = createOdooClient(
      params.connection,
      context.debug.enabled,
    );
    const { data: records } = await odooClient.post<
      Array<Record<string, unknown>>
    >(`/json/2/${params.model}/read`, { ids: [params.id], fields: null });
    const [record] = records;
    if (!record) {
      throw new Error(
        `No such "${params.model}" record with ID "${params.id}" exists.`,
      );
    }
    return { data: record };
  },
  examplePayload: getRecordByIdExamplePayload,
});
