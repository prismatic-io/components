import { list, nullable, nullableStr, num, obj, str, strArray } from "./shared";

const commitProperties = {
  id: str,
  short_id: str,
  title: str,
  message: str,
  author_name: str,
  author_email: str,
  authored_date: str,
  committer_name: str,
  committer_email: str,
  committed_date: str,
  created_at: str,
  parent_ids: strArray,
  web_url: str,
  trailers: { type: "object", additionalProperties: str },
  extended_trailers: { type: "object", additionalProperties: strArray },
};

export const commitSchema = obj(commitProperties);

export const commitDetailSchema = obj({
  ...commitProperties,
  stats: obj({ additions: num, deletions: num, total: num }),
  status: nullableStr,
  last_pipeline: nullable(obj({ id: num, ref: str, sha: str, status: str })),
});

export const commitListSchema = list(commitSchema);

export const getCommitOutputSchema = commitDetailSchema;

export const listCommitsOutputSchema = commitListSchema;
