import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, customAccountingFieldId } from "../inputs";
import type { CustomAccountingFieldOption } from "../interfaces/customAccountingFieldOption";
import { fetchAllData } from "../util";

export const selectCustomAccountingFieldOption = dataSource({
  display: {
    label: "Select Custom Accounting Field Option",
    description:
      "Select a custom accounting field option from a dropdown menu for the specified field.",
  },
  inputs: {
    connection,
    customAccountingFieldId: {
      ...customAccountingFieldId,
      dataSource: undefined,
    },
  },
  perform: async (_context, { connection, customAccountingFieldId }) => {
    const client = createClient(connection);
    const { data } = await fetchAllData<CustomAccountingFieldOption>(
      client,
      "/accounting/field-options",
      { field_id: customAccountingFieldId },
      true,
    );

    const objects = data
      .sort((a, b) => (a.value < b.value ? -1 : 1))
      .map<Element>((option) => ({
        key: option.id,
        label: option.value,
      }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Office/Admin:Phone & Internet",
        key: "96bb7007-eec5-430f-8d09-e033cbc000c2",
      },
    ],
  },
});
