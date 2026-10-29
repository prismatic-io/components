import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DEFAULT_DELIMITER, RFC_FUNCTIONS } from "../../constants";
import { getIdocStatusExamplePayload } from "../../examplePayloads";
import { getIdocStatusInputs } from "../../inputs";
import {
  buildSoapAction,
  buildSoapEnvelope,
  formatTableData,
  parseAndCheckFault,
} from "../../util";

export const getIdocStatus = action({
  display: {
    label: "Get IDoc Status",
    description:
      "Retrieve the processing status of an IDoc by reading the EDIDS status table via RFC_READ_TABLE.",
  },
  inputs: getIdocStatusInputs,
  examplePayload: getIdocStatusExamplePayload,
  perform: async (context, { connection, idocNumber, endpoint }) => {
    const debug = context.debug.enabled;
    const client = createClient(connection, context, debug);

    const fields = "DOCNUM,STATUS,STACOD,STATXT,CREDAT,CRETIM"
      .split(",")
      .map((f) => `<item><FIELDNAME>${f.trim()}</FIELDNAME></item>`)
      .join("");

    let params = `<QUERY_TABLE>EDIDS</QUERY_TABLE>`;
    params += `<DELIMITER>${DEFAULT_DELIMITER}</DELIMITER>`;
    params += `<FIELDS>${fields}</FIELDS>`;
    params += `<OPTIONS><item><TEXT>DOCNUM EQ '${idocNumber}'</TEXT></item></OPTIONS>`;
    params += `<DATA/>`;

    const soapBody = buildSoapEnvelope(RFC_FUNCTIONS.READ_TABLE, params);

    const { data } = await client.post(endpoint, soapBody, {
      headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.READ_TABLE) },
    });

    const parsed = await parseAndCheckFault(data);

    return { data: formatTableData(parsed) };
  },
});
