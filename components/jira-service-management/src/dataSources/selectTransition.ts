import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectTransitionExamplePayload } from "../examplePayloads";
import { selectTransitionInputs } from "../inputs";
import type { PagedResponse, Transition } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectTransition = dataSource({
  display: {
    label: "Select Transition",
    description:
      "Fetches available status transitions for a service request and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectTransitionInputs,
  perform: async (_context, { connection, issueIdOrKey }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<Transition> } =
      await getPaginatedData<Transition>(
        client,
        `/request/${issueIdOrKey}/transition`,
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (t) => t.name,
      (t) => t.id,
    );
    return { result };
  },
  examplePayload: selectTransitionExamplePayload,
});
