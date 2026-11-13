import { action, outputSchema } from "@prismatic-io/spectral";
import { paginateResults } from "ms-utils";
import { getOneDriveClient } from "../../client";
import { listGroupsExamplePayload } from "../../examplePayloads";
import { listGroupsInputs } from "../../inputs";
import { listGroupsOutputSchema } from "../../outputSchemas";
import { resolvePagination } from "../../util";

export const listGroups = action({
  display: {
    label: "List Groups",
    description: "Returns a list of all groups the user has access to.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fetchAll, ...paging }) => {
    const client = getOneDriveClient(connection, context.debug.enabled);
    return await paginateResults<
      (typeof listGroupsExamplePayload)["data"]["value"][number]
    >({
      client,
      endpoint: "/groups",
      fetchAll,
      ...resolvePagination(paging),
    });
  },
  examplePerform: async () => listGroupsExamplePayload,
  inputs: listGroupsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listGroupsOutputSchema,
  }),
  examplePayload: listGroupsExamplePayload,
});
