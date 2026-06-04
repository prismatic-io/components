import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listCandidatesExamplePayload } from "../../examplePayloads";
import {
  candidate_ids,
  connectionInput,
  created_after,
  created_before,
  email,
  job_id,
  page,
  per_page,
  updated_after,
  updated_before,
  version,
} from "../../inputs";
import { generatePayload } from "../../util";

export const listCandidates = action({
  display: {
    label: "List Candidates",
    description: "Retrieves a list of candidates.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      per_page,
      page,
      created_before,
      created_after,
      updated_before,
      updated_after,
      job_id,
      email,
      candidate_ids,
    },
  ) => {
    const client = createClient(connection, version, context.debug.enabled);
    const params = generatePayload({
      per_page,
      page,
      created_before,
      created_after,
      updated_before,
      updated_after,
      job_id,
      email,
      candidate_ids,
    });
    const { data } = await client.get("/candidates", {
      params,
    });
    return { data };
  },
  inputs: {
    connection: connectionInput,
    per_page,
    page,
    email: {
      ...email,
      comments:
        "If supplied, only return candidates who have a matching e-mail address. If supplied with job_id, only return a candidate with a matching e-mail with an application on the job. If email and candidate_ids are included, candidate_ids will be ignored.",
    },
    job_id,
    created_before,
    created_after,
    updated_before,
    updated_after,
    version,
    candidate_ids,
  },
  examplePayload: listCandidatesExamplePayload,
});
