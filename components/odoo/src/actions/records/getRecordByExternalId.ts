import { action } from "@prismatic-io/spectral";
import { createOdooClient } from "../../client";
import { getRecordByExternalIdExamplePayload } from "../../examplePayloads";
import { getRecordByExternalIdInputs } from "../../inputs";
import { createOdooAwaitClient, isLegacyConnection } from "../../legacy";

export const getRecordByExternalId = action({
  display: {
    label: "Get Record by External ID",
    description: "Get a record by its external ID.",
  },
  inputs: getRecordByExternalIdInputs,
  perform: async (context, params) => {
    if (isLegacyConnection(params.connection)) {
      const legacyClient = await createOdooAwaitClient(params.connection);
      const record = await legacyClient.readByExternalId<
        Record<string, unknown>
      >(params.externalId);
      return { data: record };
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
    const { data: lookups } = await odooClient.post<
      Array<{ res_id: number; model: string }>
    >("/json/2/ir.model.data/search_read", {
      domain: [
        ["module", "=", trimmed.slice(0, separatorIndex)],
        ["name", "=", trimmed.slice(separatorIndex + 1)],
      ],
      fields: ["res_id", "model"],
      limit: 1,
    });
    const lookup = lookups[0];
    if (!lookup) {
      throw new Error(
        `No record found with external ID "${params.externalId}".`,
      );
    }
    const { data: records } = await odooClient.post<
      Array<Record<string, unknown>>
    >(`/json/2/${lookup.model}/read`, {
      ids: [lookup.res_id],
      fields: null,
    });
    const [record] = records;
    if (!record) {
      throw new Error(
        `External ID "${params.externalId}" resolved to ${lookup.model}#${lookup.res_id} but the record could not be read.`,
      );
    }
    return { data: record };
  },
  examplePayload: getRecordByExternalIdExamplePayload,
});
