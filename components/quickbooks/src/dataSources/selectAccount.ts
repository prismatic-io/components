import { dataSource, type Element } from "@prismatic-io/spectral";
import { createHttpClient } from "../client";
import { selectAccountExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { PaginatedDataRequest } from "../types";
import { paginatedData } from "../util";

export const selectAccount = dataSource({
  display: {
    label: "Select Account",
    description: "Select an Account from a dropdown menu.",
  },
  inputs: {
    connectionInput,
  },
  perform: async (_context, { connectionInput }) => {
    const client = createHttpClient(connectionInput, true);

    const request: PaginatedDataRequest = {
      client,
      queryString: "select * from Account",
      objectName: "Account",
      fetchAll: true,
    };

    const data = await paginatedData(request);

    const objects = data.map<Element>((account) => ({
      key: account.Id.toString(),
      label: account.Name as string,
    }));

    return { result: objects };
  },
  dataSourceType: "picklist",
  examplePayload: selectAccountExamplePayload,
});
