import type { ActionContext } from "@prismatic-io/spectral";
import type { AxiosInstance } from "axios";
import { DEFAULT_DELIMITER, EDIDC_FIELDS, RFC_FUNCTIONS } from "../constants";
import type {
  IdocChangesObject,
  IdocRecord,
  IdocRecordChange,
  PollingStateBase,
} from "../types";
import { buildSoapAction, buildSoapEnvelope } from "./soap";
import { formatTableData, parseAndCheckFault } from "./xml";

type PollingContext = Pick<ActionContext, "logger"> & {
  polling: {
    getState: () => Record<string, unknown>;
    setState: (state: Record<string, unknown>) => void;
  };
};

export const handlePollingError = (
  error: Error,
  pollState: PollingStateBase,
  context: PollingContext,
  serviceName: string,
): never => {
  const consecutiveErrors = (pollState.consecutiveErrors || 0) + 1;
  const errorCount = (pollState.errorCount || 0) + 1;

  context.polling.setState({
    ...pollState,
    errorCount,
    consecutiveErrors,
  });

  if (consecutiveErrors >= 3) {
    context.logger.error(
      `${serviceName} polling failed ${consecutiveErrors} times consecutively. Error: ${error.message}`,
    );
  }

  throw error;
};

interface FetchNewIdocsParams {
  endpoint: string;
  lastDocnum: string;
  pageSize: number;
  messageType?: string;
  direction?: string;
}

export const fetchNewIdocs = async (
  client: AxiosInstance,
  {
    endpoint,
    lastDocnum,
    pageSize,
    messageType,
    direction,
  }: FetchNewIdocsParams,
): Promise<IdocRecord[]> => {
  const fieldItems = EDIDC_FIELDS.map(
    (f) => `<item><FIELDNAME>${f}</FIELDNAME></item>`,
  ).join("");

  const options: string[] = [`DOCNUM GT '${lastDocnum}'`];
  if (messageType) options.push(`AND MESTYP EQ '${messageType}'`);
  if (direction) options.push(`AND DIRECT EQ '${direction}'`);
  const optionItems = options
    .map((t) => `<item><TEXT>${t}</TEXT></item>`)
    .join("");

  let params = "<QUERY_TABLE>EDIDC</QUERY_TABLE>";
  params += `<DELIMITER>${DEFAULT_DELIMITER}</DELIMITER>`;
  params += `<ROWCOUNT>${pageSize}</ROWCOUNT>`;
  params += `<FIELDS>${fieldItems}</FIELDS>`;
  params += `<OPTIONS>${optionItems}</OPTIONS>`;
  params += "<DATA/>";

  const { data } = await client.post(
    endpoint,
    buildSoapEnvelope(RFC_FUNCTIONS.READ_TABLE, params),
    { headers: { SOAPAction: buildSoapAction(RFC_FUNCTIONS.READ_TABLE) } },
  );

  const parsed = await parseAndCheckFault(data);
  const tableData = formatTableData(parsed, DEFAULT_DELIMITER);

  return tableData.rows.map((row) => ({
    idocNumber: row.DOCNUM,
    status: row.STATUS,
    messageType: row.MESTYP,
    idocType: row.IDOCTP,
    createdDate: row.CREDAT,
    createdTime: row.CRETIM,
    direction: row.DIRECT,
  }));
};

export const resolveIdocChanges = (
  data: IdocChangesObject | undefined,
): IdocRecordChange[] =>
  (data?.records ?? []).map(
    (record): IdocRecordChange => ({ changeType: "created", record }),
  );
