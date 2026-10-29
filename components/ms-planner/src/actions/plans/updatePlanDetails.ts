import type { PlannerPlanDetails } from "@microsoft/microsoft-graph-types";
import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { updatePlanDetailsExamplePayload } from "../../examplePayloads";
import { updatePlanDetailsOutputSchema } from "../../outputSchemas";
import type { Etagged } from "../../types";
import { compact, patchWithEtag } from "../../utils";
import { updatePlanDetailsInputs } from "../../inputs";
export const updatePlanDetails = action({
  display: {
    label: "Update Plan Details",
    description:
      "Set a plan's category labels and adjust who it is shared with.",
  },
  inputs: updatePlanDetailsInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updatePlanDetailsOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, planId, categoryDescriptions, sharing, etag },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const sharedWith: Record<string, boolean> = {};
    for (const userId of sharing?.shareWith ?? []) {
      sharedWith[userId] = true;
    }
    for (const userId of sharing?.unshareWith ?? []) {
      sharedWith[userId] = false;
    }
    const body = compact({
      categoryDescriptions: Object.keys(categoryDescriptions ?? {}).length
        ? categoryDescriptions
        : undefined,
      sharedWith: Object.keys(sharedWith).length ? sharedWith : undefined,
    });
    const data = await patchWithEtag<PlannerPlanDetails & Etagged>(
      client,
      PLANNER_ENDPOINTS.PLAN_DETAILS(planId),
      body,
      etag,
    );
    return { data };
  },
  examplePerform: async (
    _context,
    { categoryDescriptions, sharing },
  ): Promise<{
    data: unknown;
  }> => {
    const sharedWith: Record<string, unknown> = {
      ...updatePlanDetailsExamplePayload.data.sharedWith,
    };
    for (const userId of sharing?.shareWith ?? []) {
      sharedWith[userId] = true;
    }
    for (const userId of sharing?.unshareWith ?? []) {
      delete sharedWith[userId];
    }
    return {
      data: {
        ...updatePlanDetailsExamplePayload.data,
        categoryDescriptions: {
          ...updatePlanDetailsExamplePayload.data.categoryDescriptions,
          ...categoryDescriptions,
        },
        sharedWith,
      },
    };
  },
  examplePayload: updatePlanDetailsExamplePayload,
});
