import { dataSource } from "@prismatic-io/spectral";
import { createSalesforceClient } from "../../client";
import { previewRecordTypeFieldValuesInputs } from "../../inputs";

export const previewRecordTypeFieldValues = dataSource({
  display: {
    label: "Preview Record Type Field Values",
    description:
      "A list of values of the specified Record Type field for use as a preview during configuration.",
  },
  inputs: previewRecordTypeFieldValuesInputs,
  perform: async (
    _context,
    { version, connection, dynamicRecordType, dynamicFieldName, valueCount },
  ) => {
    const sfClient = await createSalesforceClient(connection, version);

    
    
    
    
    
    
    const record = dynamicRecordType;

    let values = [];
    try {
      const queryString = `
      SELECT ${dynamicFieldName}
      FROM ${record}
      GROUP BY ${dynamicFieldName}
      ORDER BY ${dynamicFieldName}
      LIMIT ${valueCount}
      `;
      const { records } = await sfClient.query(queryString);
      values = records.map((record) => record[dynamicFieldName]);
    } catch (_error) {
      values = ["No preview available for selected field"];
    }

    return {
      result: values,
    };
  },
  dataSourceType: "picklist",
});
