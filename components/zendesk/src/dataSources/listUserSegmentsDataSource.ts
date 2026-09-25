import { dataSource, util } from "@prismatic-io/spectral";
import { rawHttpClient } from "../auth";
import { listUserSegmentsDataSourceExamplePayload } from "../examplePayloads";
import { listUserSegmentsDataSourceInputs } from "../inputs";
import type { UserSegment } from "../types";
import { paginateResults } from "../util";
export const listUserSegmentsDataSource = dataSource({
  display: {
    label: "Select User Segments",
    description: "Select a user segment from the Zendesk Help Center.",
  },
  perform: async (_context, { zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection);
    const results = [] as UserSegment[];
    const nextUrl = "/help_center/user_segments.json";
    const paginatedResults = await paginateResults<UserSegment>(
      client,
      nextUrl,
      results,
      "user_segments",
    );
    return {
      result: paginatedResults.map((usegment: UserSegment) => ({
        label: usegment.name,
        key: util.types.toString(usegment.id),
      })),
    };
  },
  inputs: listUserSegmentsDataSourceInputs,
  dataSourceType: "picklist",
  examplePayload: listUserSegmentsDataSourceExamplePayload,
});
