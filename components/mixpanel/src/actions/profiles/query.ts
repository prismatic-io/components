import { action } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import {
  connectionInput,
  regionAndDomain,
  project_id,
  workspace_id,
  where,
  behaviors,
  as_of_timestamp,
  filter_by_cohort,
  include_all_users,
  distinct_ids,
  output_properties,
  session_id,
  page,
} from "../../inputs";
import { Authorization } from "../../enums/Authorization";
import { queryProfilesExamplePayload } from "../../examplePayloads";

export const queryProfiles = action({
  display: {
    label: "Query Profile",
    description:
      "Query user profile data and return list of users that fit specified parameters.",
  },
  inputs: {
    connection: connectionInput,
    regionAndDomain,
    project_id: { ...project_id, required: true },
    workspace_id,
    distinct_ids,
    where: {
      ...where,
      comments:
        "An expression to filter users by. See the expressions section above. https://developer.mixpanel.com/reference/segmentation-expressions",
    },
    output_properties,
    session_id,
    page,
    behaviors,
    as_of_timestamp,
    filter_by_cohort,
    include_all_users,
  },
  perform: async (
    context,
    {
      connection,
      regionAndDomain,
      project_id,
      workspace_id,
      distinct_ids,
      where,
      output_properties,
      session_id,
      page,
      behaviors,
      as_of_timestamp,
      filter_by_cohort,
      include_all_users,
    },
  ) => {
    const client = createMixpanelClient(
      regionAndDomain,
      connection,
      Authorization.Account,
      context.debug.enabled,
    );
    const { data } = await client.post(
      "/engage",
      {
        distinct_ids: distinct_ids || undefined,
        where: where || undefined,
        output_properties: output_properties || undefined,
        session_id: session_id || undefined,
        page: page || undefined,
        behaviors: behaviors || undefined,
        as_of_timestamp: as_of_timestamp || undefined,
        filter_by_cohort: filter_by_cohort || undefined,
        include_all_users,
      },
      {
        params: {
          project_id: project_id || undefined,
          workspace_id: workspace_id || undefined,
        },
      },
    );
    return { data };
  },
  examplePayload: queryProfilesExamplePayload,
});
