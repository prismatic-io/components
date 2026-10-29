import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, formId } from "../inputs";
import { fetchAllData } from "../util";
import type { Response } from "../interfaces/responses";
import { selectResponseExample } from "../examplePayloads/datasources";

export const selectResponse = dataSource({
  display: {
    label: "Select Response",
    description: "A picklist of form responses from the selected form.",
  },
  inputs: {
    formId: {
      ...formId,
      dataSource: undefined,
    },
    connection,
  },
  perform: async (_context, { connection, formId }) => {
    const client = createClient(connection, false);
    const { data } = await fetchAllData<Response>(
      client,
      `/forms/${formId}/responses`,
      {},
      true,
    );
    const result = data.items.map<Element>((response) => ({
      label: response.submitted_at || response.response_id,
      key: response.response_id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: selectResponseExample,
  },
});
