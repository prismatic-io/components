import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  DEFAULT_DELIMITER,
  DEFAULT_DOCNUM,
  EDIDC_FIELDS,
  ENDPOINTS,
  RFC_FUNCTIONS,
} from "../constants";
import { pollIdocExamplePayload } from "../examplePayloads";
import { pollIdocInputs } from "../inputs";
import type { IdocPollingState } from "../types";
import {
  buildSoapAction,
  buildSoapEnvelope,
  formatTableData,
  handlePollingError,
  parseAndCheckFault,
} from "../util";

export const pollIdocTrigger = pollingTrigger({
  display: {
    label: "New IDocs",
    description:
      "Checks for new IDocs in the SAP EDIDC table on a configured schedule, using the DOCNUM field as a cursor.",
  },

  inputs: pollIdocInputs,
  examplePayload: pollIdocExamplePayload,

  perform: async (
    context,
    payload,
    { connection, endpoint, rowCount, messageType, direction, startingDocnum },
  ) => {
    const pollState: IdocPollingState =
      Object.keys(context.polling.getState()).length > 0
        ? (context.polling.getState() as unknown as IdocPollingState)
        : {
            lastDocnum: startingDocnum || DEFAULT_DOCNUM,
            errorCount: 0,
            consecutiveErrors: 0,
          };

    const { lastDocnum } = pollState;

    try {
      const client = createClient(connection, context, context.debug.enabled);

      const fieldItems = EDIDC_FIELDS.map(
        (f) => `<item><FIELDNAME>${f}</FIELDNAME></item>`,
      ).join("");

      let params = "<QUERY_TABLE>EDIDC</QUERY_TABLE>";
      params += `<DELIMITER>${DEFAULT_DELIMITER}</DELIMITER>`;
      params += `<ROWCOUNT>${rowCount || 50}</ROWCOUNT>`;
      params += `<FIELDS>${fieldItems}</FIELDS>`;

      const options: string[] = [`DOCNUM GT '${lastDocnum}'`];
      if (messageType) options.push(`AND MESTYP EQ '${messageType}'`);
      if (direction) options.push(`AND DIRECT EQ '${direction}'`);

      const optionItems = options
        .map((t) => `<item><TEXT>${t}</TEXT></item>`)
        .join("");
      params += `<OPTIONS>${optionItems}</OPTIONS>`;
      params += "<DATA/>";

      const soapBody = buildSoapEnvelope(RFC_FUNCTIONS.READ_TABLE, params);

      const { data } = await client.post(
        endpoint || ENDPOINTS.SOAP_RFC,
        soapBody,
        {
          headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.READ_TABLE) },
        },
      );

      const parsed = await parseAndCheckFault(data);

      const tableData = formatTableData(parsed, DEFAULT_DELIMITER);

      const records = tableData.rows.map((row) => ({
        idocNumber: row.DOCNUM,
        status: row.STATUS,
        messageType: row.MESTYP,
        idocType: row.IDOCTP,
        createdDate: row.CREDAT,
        createdTime: row.CRETIM,
        direction: row.DIRECT,
      }));

      const newLastDocnum =
        records.length > 0
          ? records.reduce(
              (max, r) => (r.idocNumber > max ? r.idocNumber : max),
              lastDocnum,
            )
          : lastDocnum;

      context.polling.setState({
        lastDocnum: newLastDocnum,
        errorCount: 0,
        consecutiveErrors: 0,
      });

      return {
        payload: {
          ...payload,
          body: {
            data: {
              records,
              recordCount: records.length,
              lastDocnum: newLastDocnum,
            },
          },
        },
        polledNoChanges: records.length === 0,
      };
    } catch (e) {
      handlePollingError(
        e as Error,
        pollState,
        context,
        "SAP ECC IDoc Polling",
      );
    }
  },
});
