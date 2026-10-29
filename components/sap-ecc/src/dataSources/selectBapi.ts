import { type Element, dataSource, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { DEFAULT_DELIMITER, RFC_FUNCTIONS } from "../constants";
import { selectBapiExamplePayload } from "../examplePayloads";
import { selectBapiInputs } from "../inputs";
import {
  buildSoapAction,
  buildSoapEnvelope,
  extractItems,
  parseAndCheckFault,
} from "../util";

export const selectBapi = dataSource({
  display: {
    label: "Select BAPI",
    description:
      "Search for available BAPIs/RFC function modules in SAP. Use a search pattern to filter results.",
  },
  inputs: selectBapiInputs,
  dataSourceType: "picklist",
  examplePayload: selectBapiExamplePayload,
  perform: async (context, { connection, endpoint, searchPattern }) => {
    const client = createClient(connection, context, false);

    const pattern = searchPattern || "BAPI_%";

    let params = "<QUERY_TABLE>TFDIR</QUERY_TABLE>";
    params += `<DELIMITER>${DEFAULT_DELIMITER}</DELIMITER>`;
    params += "<ROWCOUNT>500</ROWCOUNT>";
    params += "<FIELDS><item><FIELDNAME>FUNCNAME</FIELDNAME></item></FIELDS>";
    params += `<OPTIONS><item><TEXT>FUNCNAME LIKE '${pattern}'</TEXT></item></OPTIONS>`;
    params += `<DATA/>`;

    const soapBody = buildSoapEnvelope(RFC_FUNCTIONS.READ_TABLE, params);

    const { data } = await client.post(endpoint, soapBody, {
      headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.READ_TABLE) },
    });

    const parsed = await parseAndCheckFault(data);

    const items = extractItems(parsed, "DATA");

    const result = items.map<Element>((item) => {
      const funcName = util.types.toString(item.WA).trim();
      return { label: funcName, key: funcName };
    });

    return { result };
  },
});
