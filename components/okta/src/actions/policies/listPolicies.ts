import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listPoliciesExamplePayload } from "../../examplePayloads/policies";
import { listPoliciesInputs } from "../../inputs/policies";
import type { Policy } from "../../interfaces/policies";
import { paginateRecordsWithLink } from "../../util/util";

export const listPolicies = action({
  display: {
    label: "List Policies",
    description: "List policies with optional search and filtering.",
  },
  inputs: listPoliciesInputs,
  perform: async (
    context,
    { after, connection, expand, limit, q, resourceId, sortBy, status, type, fetchAll },
  ) => {
    const client = await createClient(connection, context.debug.enabled);

    const data = await paginateRecordsWithLink<Policy>(client, "/policies", fetchAll, {
      after,
      expand,
      limit,
      q,
      resourceId,
      sortBy,
      status,
      type,
    });

    return {
      data,
    };
  },
  examplePayload: listPoliciesExamplePayload,
});
