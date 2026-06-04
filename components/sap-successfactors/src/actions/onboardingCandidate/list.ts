import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { defaultListInputs } from "../../inputs/general";
import { paginateData } from "../../util";

export const listOnboardingCandidateInfo = action({
  display: {
    label: "List Onboarding Candidate Info",
    description: "Get entities from OnboardingCandidateInfo",
  },
  inputs: defaultListInputs,
  perform: async (
    context,
    {
      connection,
      customQueryParams,
      fetchAll,
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
    },
  ) => {
    const client = await createClient(connection, context.debug.enabled);
    const data = await paginateData(client, "/OnboardingCandidateInfo", fetchAll, {
      $count,
      $filter,
      $orderby,
      $search,
      $select,
      $skip,
      $top,
      ...customQueryParams,
    });
    return {
      data,
    };
  },
});
