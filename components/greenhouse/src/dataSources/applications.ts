import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";
import type { CandidateApplication as Application } from "../types";

export const applications = dataSource({
  display: {
    label: "Fetch Applications",
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
  examplePayload: {
    result: [
      { label: "#69306314 - UX Designer - Boston (active)", key: "69306314" },
      { label: "#69306509 - Product Manager (hired)", key: "69306509" },
    ],
  },
});
