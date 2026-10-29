import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listTransformationExamplePayload } from "../../examplePayloads";
import { paginateResults } from "../../helpers/pagination";
import { connectionInput, count, cursor, fetchAll, region } from "../../inputs";

export const listTransformations = action({
  display: {
    label: "List Transformations",
    description: "Returns a list of Transformations.",
  },
  inputs: {
    connectionInput,
    region,
    fetchAll,
    count,
    cursor,
  },
  perform: async (
    context,
    { connectionInput, region, fetchAll, count, cursor },
  ) => {
    const client = createClient(connectionInput, region, context.debug.enabled);
    return await paginateResults({
      client,
      endpoint: "/transformations",
      fetchAll,
      count,
      cursor,
    });
  },
  examplePayload: {
    data: listTransformationExamplePayload,
  },
});
