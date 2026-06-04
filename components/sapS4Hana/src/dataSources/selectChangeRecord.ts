import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { handleErrors } from "@prismatic-io/spectral/dist/clients/http";
import { getSapClient } from "../client";
import { connectionInput } from "../inputs";

export const selectChangeRecord = dataSource({
  display: {
    label: "Select Change Record",
    description: "A picklist of change records in the SAP S/4HANA system.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const headers = {
      Accept: "application/json",
    };
    const client = getSapClient(connection, headers);

    try {
      const { data } = await client.get(
        "/sap/opu/odata/sap/API_CHANGE_RECORD/A_ChangeRecord?$select=ChangeRecordUUID,ChangeRecord,ChgRecordDescriptionText",
      );

      const results = (data?.d?.results ?? data?.value ?? []) as Record<string, string>[];

      const result: Element[] = results
        .map((record) => ({
          label: record.ChgRecordDescriptionText
            ? `${record.ChangeRecord} - ${record.ChgRecordDescriptionText}`
            : (record.ChangeRecord ?? record.ChangeRecordUUID),
          key: record.ChangeRecordUUID?.toString() ?? "",
        }))
        .filter((item) => item.key)
        .sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));

      return { result };
    } catch (error) {
      const handled = handleErrors(error);
      const serialized = util.types.toJSON(handled);
      throw new Error(serialized);
    }
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "CR-001 - Initial Change Record",
        key: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      },
    ],
  },
});
