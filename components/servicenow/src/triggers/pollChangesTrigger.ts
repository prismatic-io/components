import { pollingTrigger } from "@prismatic-io/spectral";
import {
  apiVersionInput,
  connection,
  instanceUrlInput,
  showNewRecords,
  showUpdatedRecords,
  tableNameInput,
} from "../inputs";
import { getTable } from "../util";

type PollingState = {
  lastPolledAt?: string;
};

interface ChangeRecord {
  sys_created_on: string;
  sys_updated_on: string;
  [key: string]: unknown;
}

export const pollChangesTrigger = pollingTrigger({
  display: {
    label: "New and Updated Records",
    description:
      "Checks for new and updated records in a selected ServiceNow table on a configured schedule.",
  },
  inputs: {
    connection,
    instanceUrlInput,
    apiVersionInput,
    tableNameInput,
    showNewRecords,
    showUpdatedRecords,
  },
  perform: async (context, payload, params) => {
    const now = new Date().toISOString();

    const pollState = context.polling.getState() as unknown as PollingState;
    const lastPolledAt: string = pollState?.lastPolledAt || now;

    context.logger.debug(
      `Polling ServiceNow table '${params.tableNameInput}' for changes from ${lastPolledAt} to ${now}`,
    );

    const sysparmQuery = `sys_updated_on>${lastPolledAt}^ORDERBYsys_updated_on`;

    const records = (await getTable({
      connection: params.connection,
      tableName: params.tableNameInput,
      apiVersion: params.apiVersionInput,
      instanceUrl: params.instanceUrlInput,
      queryParameters: {
        sysparm_query: sysparmQuery,
      },
      debug: false,
    })) as ChangeRecord[];

    const allRecords: ChangeRecord[] = Array.isArray(records) ? records : [];

    const lastPolledDate = new Date(lastPolledAt);

    const created = allRecords.filter(
      (record) => new Date(record.sys_created_on) > lastPolledDate,
    );

    const updated = allRecords.filter(
      (record) =>
        new Date(record.sys_updated_on) > lastPolledDate &&
        new Date(record.sys_created_on) <= lastPolledDate,
    );

    const filteredCreated = params.showNewRecords ? created : [];
    const filteredUpdated = params.showUpdatedRecords ? updated : [];

    context.polling.setState({ lastPolledAt: now });

    const totalChanges = filteredCreated.length + filteredUpdated.length;

    return {
      payload: {
        ...payload,
        body: {
          data: {
            created: filteredCreated,
            updated: filteredUpdated,
          },
        },
      },
      polledNoChanges: totalChanges === 0,
    };
  },
});
