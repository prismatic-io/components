import { dataSource } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { selectRequestExamplePayload } from "../examplePayloads";
import { selectRequestInputs } from "../inputs";
import type { PagedResponse, ServiceRequest } from "../types";
import { getPaginatedData, toSortedPicklist } from "../util";



export const selectRequest = dataSource({
  display: {
    label: "Select Request",
    description:
      "Fetches service requests for a service desk and returns them as a dropdown.",
  },
  dataSourceType: "picklist",
  inputs: selectRequestInputs,
  perform: async (_context, { connection, serviceDeskId }) => {
    const { client } = await createClient(connection, false);
    const { data }: { data: PagedResponse<ServiceRequest> } =
      await getPaginatedData<ServiceRequest>(client, "/request", true, {
        params: { serviceDeskId },
      });
    const result = toSortedPicklist(
      data.values,
      (req) =>
        req.summary ? `${req.issueKey} — ${req.summary}` : req.issueKey,
      (req) => req.issueId,
    );
    return { result };
  },
  examplePayload: selectRequestExamplePayload,
});
