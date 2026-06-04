import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectRequestTypeExamplePayload } from "../examplePayloads";
import { selectRequestTypeInputs } from "../inputs";
import type { PagedResponse, RequestType } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectRequestType = dataSource({
  display: {
    label: "Select Request Type",
    description:
      "Fetches request types for a service desk and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectRequestTypeInputs,
  perform: async (_context, { connection, serviceDeskId }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<RequestType> } =
      await getPaginatedData<RequestType>(
        client,
        `/servicedesk/${serviceDeskId}/requesttype`,
        true,
      );
    const result = toSortedPicklist(
      data.values,
      (rt) => rt.name,
      (rt) => rt.id,
    );
    return { result };
  },
  examplePayload: selectRequestTypeExamplePayload,
});
