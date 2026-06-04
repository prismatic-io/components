import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connectionInput, version } from "../inputs";
import type { CandidateDataSources } from "../types";

export const candidatesNames = dataSource({
  display: {
    label: "Fetch Candidate Names",
    description: "Fetches an array of candidate names.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<CandidateDataSources[]>("/candidates");
    const result = data.map<Element>((candidate) => ({
      label: `${candidate.first_name} ${candidate.last_name}`,
      key: candidate.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "John Locke", key: "650" },
      { label: "John Doe", key: "47012" },
    ],
  },
});

export const candidatesEmail = dataSource({
  display: {
    label: "Fetch Candidate Emails",
    description: "Fetches an array of candidate emails.",
  },
  inputs: {
    connection: connectionInput,
    version,
  },
  perform: async (_context, { connection, version }) => {
    const client = createClient(connection, version);
    const { data } = await client.get<CandidateDataSources[]>("/candidates");
    const result = data.map<Element>((candidate) => ({
      label: candidate.email_addresses[0].value,
      key: candidate.id.toString(),
    }));
    return { result };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      { label: "John@Locke.com", key: "650" },
      { label: "John@Doe.es", key: "47012" },
    ],
  },
});
