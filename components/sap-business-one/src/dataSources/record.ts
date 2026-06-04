import { dataSource } from "@prismatic-io/spectral";
import { $filter, connection, keyField, labelField } from "../inputs/general";
import { createClient } from "../client";
import { fetchAllData, mapPicklistArray, validateArray } from "../util";
import { businessPartnerDataSourceExamplePayload as recordDataSourceExamplePayload } from "../examplePayloads/datasources";
import { recordType } from "../inputs/records/general";

export const selectRecord = dataSource({
  display: {
    label: "Select Record",
    description: "Select a Custom Record type from a dropdown menu.",
  },
  inputs: {
    recordType,
    keyField,
    labelField,
    $filter,
    connection,
  },
  perform: async (context, { connection, recordType, keyField, labelField, $filter }) => {
    const client = await createClient(connection, context, true);

    const data = await fetchAllData(
      client,
      recordType,
      {
        $select: `${keyField},${labelField}`,
        $filter,
      },
      true,
      1000,
    );

    const array = validateArray(data);

    const objects = mapPicklistArray({
      data: array,
      keyName: keyField,
      keyLabel: labelField,
      orderKey: keyField,
    });

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: recordDataSourceExamplePayload,
});
