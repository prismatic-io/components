import { dataSource, util } from "@prismatic-io/spectral";

import { createSsvClient } from "../client";
import { DEFAULT_PAGE_SIZE } from "../constants";
import { selectElementProfileExamplePayload } from "../examplePayloads/dataSources";
import { selectElementProfileInputs } from "../inputs";
import type { ElementProfile } from "../types";
import { sortByLabel } from "../util";







export const selectElementProfile = dataSource({
  display: {
    label: "Select Element Profile",
    description: "Select an element profile from a team's available profiles.",
  },
  inputs: selectElementProfileInputs,
  perform: async (_context, params) => {
    const client = await createSsvClient(params.ssvConnection);
    const { data } = await client.get(
      `/v3/team/${params.teamId}/element_profiles`,
      { params: { "page[size]": DEFAULT_PAGE_SIZE } },
    );

    const result = sortByLabel(
      (data.element_profiles as ElementProfile[]).map((profile) => ({
        label: profile.name,
        key: util.types.toString(profile.id),
      })),
    );

    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: selectElementProfileExamplePayload,
});
