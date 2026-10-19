import { pollingTrigger } from "@prismatic-io/spectral";
import { createClient } from "../client";
import {
  DEFAULT_BATCH_SIZE,
  DEFAULT_DOCNUM,
  ENDPOINTS,
  MAX_BATCHED_PAGE_SIZE,
} from "../constants";
import { pollIdocExamplePayload } from "../examplePayloads";
import { pollIdocInputs } from "../inputs";
import type {
  IdocChangesObject,
  IdocPollingState,
  IdocRecordChange,
} from "../types";
import { fetchNewIdocs, handlePollingError, resolveIdocChanges } from "../util";
export const pollIdocTrigger = pollingTrigger({
  display: {
    label: "New IDocs",
    description:
      "Checks for new IDocs in the SAP EDIDC table on a configured schedule, using the DOCNUM field as a cursor.",
  },
  inputs: pollIdocInputs,
  examplePayload: pollIdocExamplePayload,
  triggerResolverSupport: "valid",
  batchConfig: { batchSize: DEFAULT_BATCH_SIZE },
  triggerResolver: {
    resolveItems: (_context, { payload }): IdocRecordChange[] =>
      resolveIdocChanges(payload.body.data as IdocChangesObject),
  },
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
      const requestedPageSize = rowCount || 50;
      const pageSize = context.batch?.enabled
        ? Math.min(requestedPageSize, MAX_BATCHED_PAGE_SIZE)
        : requestedPageSize;
      const records = await fetchNewIdocs(client, {
        endpoint: endpoint || ENDPOINTS.SOAP_RFC,
        lastDocnum,
        pageSize,
        messageType,
        direction,
      });
      const newLastDocnum = records.reduce(
        (max, r) => (r.idocNumber > max ? r.idocNumber : max),
        lastDocnum,
      );
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
