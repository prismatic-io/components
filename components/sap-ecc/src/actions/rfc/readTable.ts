import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DEFAULT_DELIMITER, RFC_FUNCTIONS } from "../../constants";
import { readTableExamplePayload } from "../../examplePayloads";
import { readTableInputs } from "../../inputs";
import {
  buildSoapAction,
  buildSoapEnvelope,
  formatTableData,
  parseAndCheckFault,
} from "../../util";

export const readTable = action({
  display: {
    label: "Read Table",
    description:
      "Read data from any SAP table using RFC_READ_TABLE. Supports field selection, row limits, and WHERE clause filtering.",
  },
  inputs: readTableInputs,
  examplePayload: readTableExamplePayload,
  perform: async (
    context,
    {
      connection,
      tableName,
      fields,
      rowCount,
      rowSkips,
      whereClause,
      endpoint,
    },
  ) => {
    const debug = context.debug.enabled;
    const client = createClient(connection, context, debug);

    let params = `<QUERY_TABLE>${tableName}</QUERY_TABLE>`;
    params += `<DELIMITER>${DEFAULT_DELIMITER}</DELIMITER>`;

    if (rowCount) {
      params += `<ROWCOUNT>${rowCount}</ROWCOUNT>`;
    }

    if (rowSkips) {
      params += `<ROWSKIPS>${rowSkips}</ROWSKIPS>`;
    }

    if (fields) {
      const fieldItems = fields
        .split(",")
        .map((f) => `<item><FIELDNAME>${f.trim()}</FIELDNAME></item>`)
        .join("");
      params += `<FIELDS>${fieldItems}</FIELDS>`;
    }

    if (whereClause) {
      params += `<OPTIONS><item><TEXT>${whereClause}</TEXT></item></OPTIONS>`;
    } else {
      params += `<OPTIONS/>`;
    }

    params += `<DATA/>`;

    const soapBody = buildSoapEnvelope(RFC_FUNCTIONS.READ_TABLE, params);

    const { data } = await client.post(endpoint, soapBody, {
      headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.READ_TABLE) },
    });

    const parsed = await parseAndCheckFault(data);
    const tableData = formatTableData(parsed, DEFAULT_DELIMITER);
    return { data: tableData };
  },
});
