import { util } from "@prismatic-io/spectral";
import {
  connectionInput,
  regionAndDomain,
  dataAndDomain,
  project_id,
  workspace_id,
} from "./common";
export const funnelsInputs = {
  connection: connectionInput,
  regionAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
  workspace_id,
};
export const pipelinesInputs = {
  connection: connectionInput,
  dataAndDomain,
  project_id: { ...project_id, required: true, clean: util.types.toString },
};
