import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listChangesExamplePayload as examplePayload } from "../../examplePayloads";
import { listChangesInputs as inputs } from "../../inputs/change";
import { getMinimalHeader } from "../../util";

export const listChanges = action({
  display: {
    label: "List Changes",
    description:
      "Retrieves a list of changes in an object and its children over time.",
  },
  perform: async (
    context,
    {
      connection,
      deltaURL,
      $deltatoken,
      $skiptoken,
      $select,
      $filter,
      returnMinimal,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $deltatoken,
      $skiptoken,
      $select,
      $filter,
    };
    const { data } = await client.get(deltaURL as string, {
      params,
      headers: getMinimalHeader(returnMinimal),
    });
    return {
      data,
    };
  },
  inputs,
  examplePayload,
});
