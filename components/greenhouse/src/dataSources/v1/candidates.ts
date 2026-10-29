import { dataSource, type Element } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  candidateEmailsV1DataSourceExamplePayload,
  candidateNamesV1DataSourceExamplePayload,
} from "../../examplePayloads/v1/dataSources";
import { connectionInput, version } from "../../inputs";
import type { CandidateDataSources } from "../../types";

export const candidatesNames = dataSource({
  display: {
    label: "Fetch Candidate Names (Harvest v1/v2)",
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
  examplePayload: candidateNamesV1DataSourceExamplePayload,
});

export const candidatesEmail = dataSource({
  display: {
    label: "Fetch Candidate Emails (Harvest v1/v2)",
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
  examplePayload: candidateEmailsV1DataSourceExamplePayload,
});
