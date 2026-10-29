import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { applicationsV1DataSourceExamplePayload } from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { CandidateApplication as Application } from "../../types";

export const applications = dataSource({
  display: {
    label: "Fetch Applications (Harvest v1/v2)",
    description: "Fetches an array of applications.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<Application[]>("/applications");
    const result = data
      .map<Element>((application) => ({
        label: `#${application.id} - ${application.jobs?.[0]?.name ?? "No Job"} (${application.status})`,
        key: application.id.toString(),
      }))
      .sort((a, b) => ((a.label ?? "") < (b.label ?? "") ? -1 : 1));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: applicationsV1DataSourceExamplePayload,
});
