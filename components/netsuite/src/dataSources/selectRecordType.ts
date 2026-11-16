import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { RECORD_SERVICE } from "../constants";
import { selectRecordTypeExamplePayload } from "../examplePayloads";
import { selectRecordTypeInputs } from "../inputs";

export const selectRecordType = dataSource({
  display: {
    label: "Select Record Type",
    description:
      "Select a record type from the account's metadata catalog, which includes the record types the account exposes through REST web services.",
  },
  inputs: selectRecordTypeInputs,
  dataSourceType: "picklist",
  examplePayload: selectRecordTypeExamplePayload,
  perform: async (_context, { connection }) => {
    const client = await createClient(connection, RECORD_SERVICE, false);
    const { data } = await client.get("/metadata-catalog");
    const items: { name: string }[] = data?.items ?? [];

    return {
      result: items
        .map<Element>(({ name }) => ({ key: name, label: name }))
        .sort((a, b) => (a.key < b.key ? -1 : 1)),
    };
  },
});
