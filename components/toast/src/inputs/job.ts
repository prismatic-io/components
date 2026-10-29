import { input, util } from "@prismatic-io/spectral";
import { cleanValueListInput } from "../utils";
import { connection, restaurantExternalId } from "./shared";

const jobId = input({
  label: "Job ID",
  type: "string",
  required: true,
  comments: "The Toast platform GUID or an external identifier for the job.",
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  clean: util.types.toString,
});

export const getOneJobInputs = {
  connection,
  restaurantExternalId,
  jobId,
};

const jobIds = input({
  label: "Job IDs",
  type: "string",
  collection: "valuelist",
  required: false,
  example: "12345678-1234-1234-1234-123456789012",
  placeholder: "12345678-1234-1234-1234-123456789012",
  comments:
    "An optional job identifier, either the Toast platform GUID or an external identifier assigned by the client.",
  clean: cleanValueListInput,
});

export const listJobsInputs = {
  connection,
  restaurantExternalId,
  jobIds,
};
