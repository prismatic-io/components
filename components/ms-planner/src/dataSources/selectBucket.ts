import type { PlannerBucket } from "@microsoft/microsoft-graph-types";
import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectBucketExamplePayload } from "../examplePayloads";
import { PLANNER_ENDPOINTS } from "../constants";
import { fetchAllPlanner } from "../utils";
import { selectBucketInputs } from "../inputs";

export const selectBucket = dataSource({
  display: {
    label: "Select Bucket",
    description: "Select a bucket from a plan.",
  },
  inputs: selectBucketInputs,
  perform: async (_context, { connection, planId }) => {
    const client = createClient(connection, false);
    const { value } = await fetchAllPlanner<PlannerBucket>(
      client,
      PLANNER_ENDPOINTS.PLAN_BUCKETS(planId),
    );

    const result = value.map<Element>((bucket) => ({
      label: util.types.toString(bucket.name),
      key: util.types.toString(bucket.id),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectBucketExamplePayload,
});
