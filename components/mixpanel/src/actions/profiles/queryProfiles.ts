import { action, outputSchema } from "@prismatic-io/spectral";
import { createMixpanelClient } from "../../client";
import { queryProfilesInputs } from "../../inputs";
import { Authorization } from "../../enums/authorization";
import { queryProfilesExamplePayload } from "../../examplePayloads";
import { queryProfilesOutputSchema } from "../../outputSchemas";
export const queryProfiles = action({
  display: {
    label: "Query Profile",
    description:
      "Query user profile data and return list of users that fit specified parameters.",
  },
  inputs: queryProfilesInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: queryProfilesOutputSchema,
  }),
  performSafety: "notAllowed",
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
      pagination,
      cohortFilters,
      as_of_timestamp,
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
        distinct_ids,
        where,
        output_properties,
        session_id: pagination.session_id,
        page: pagination.page,
        behaviors: cohortFilters.behaviors,
        as_of_timestamp,
        filter_by_cohort: cohortFilters.filter_by_cohort,
        include_all_users: cohortFilters.include_all_users,
      },
      {
        params: {
          project_id,
          workspace_id,
        },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => queryProfilesExamplePayload,
  examplePayload: queryProfilesExamplePayload,
});
