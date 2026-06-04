import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { listRequestsDatasource as examplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";
import type { Request } from "../interfaces";
import { paginateData } from "../util";

export const selectRequest = dataSource({
  display: {
    label: "Select Request",
    description: "Select a request from the list of requests.",
  },
  inputs: {
    connection: connectionInput,
  },
  perform: async (_context, { connection }) => {
    const client = createClient(connection, false);
    const data = await paginateData(
      client,
      "requests",
      undefined,
      undefined,
      true,
      undefined,
    );
    const result = (data.requests as Request[]).map<Element>((request) => ({
      label: request.subject,
      key: request.id,
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload,
});
