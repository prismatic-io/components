import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectTermExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectTerm = dataSource({
  display: {
    label: "Select Term",
    description: "Select a payment term from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Term",
      objectName: "Term",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((term) => ({
      key: term.Id.toString(),
      label: term.Name as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectTermExamplePayload,
});
