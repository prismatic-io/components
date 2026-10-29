import {
  bool,
  list,
  nullable,
  nullableNum,
  nullableStr,
  num,
  obj,
  str,
  userSchema,
} from "./shared";

const pipelineProperties = {
  id: num,
  iid: num,
  project_id: num,
  sha: str,
  ref: str,
  status: str,
  source: str,
  name: nullableStr,
  created_at: str,
  updated_at: str,
  web_url: str,
};

export const pipelineSchema = obj(pipelineProperties);

export const pipelineDetailSchema = obj({
  ...pipelineProperties,
  before_sha: str,
  tag: bool,
  yaml_errors: nullableStr,
  user: nullable(userSchema),
  started_at: nullableStr,
  finished_at: nullableStr,
  committed_at: nullableStr,
  duration: nullableNum,
  queued_duration: nullableNum,
  coverage: { type: ["string", "number", "null"] },
  detailed_status: obj({
    icon: str,
    text: str,
    label: str,
    group: str,
    tooltip: str,
    has_details: bool,
    details_path: str,
    illustration: nullable(
      obj({ content: str, image: str, size: str, title: str }),
    ),
    action: nullable(
      obj({
        button_title: str,
        confirmation_message: str,
        icon: str,
        method: str,
        path: str,
        title: str,
      }),
    ),
    favicon: str,
  }),
  archived: bool,
});

export const pipelineListSchema = list(pipelineSchema);

export const getPipelineOutputSchema = pipelineDetailSchema;

export const listPipelinesOutputSchema = pipelineListSchema;
