import { input, util } from "@prismatic-io/spectral";
import { MAX_LIST_FOLDER_LIMIT } from "../constants";
import { cleanInitialSyncPageSize, lookBackDateClean } from "../util";
import {
  connectionInput,
  directoryPath,
  teamMemberId,
  userType,
} from "./common";
import { includeDeleted, recursive } from "./files";
export const dropboxWebhookInputs = {
  signingSecret: input({
    label: "Signing Secret",
    type: "password",
    required: true,
    comments:
      "The 'App Secret' of the Dropbox app, used to verify that an incoming request was signed by Dropbox.",
    clean: util.types.toString,
  }),
};
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync reports each file modified on or after this date once; Dropbox has no date filter on folder listing, so the folder is still read in full and the date bounds only what is dispatched.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const pollChangesTriggerInputs = {
  dropboxConnection: connectionInput,
  directoryPath,
  recursive,
  includeDeleted,
  lookBackDate,
  userType,
  teamMemberId,
};
export const pollChangesOnDeployInputs = {
  initialSyncPageSize: input({
    label: "Initial Sync Page Size",
    placeholder: "Enter the number of entries to read per backfill request",
    type: "string",
    required: false,
    comments: `How many existing entries to read per request while backfilling on deploy. Defaults to ${MAX_LIST_FOLDER_LIMIT}, the largest value Dropbox accepts. Lower it when a downstream step is slow enough that a full page of work per round is too much to hand over at once.`,
    example: "500",
    clean: cleanInitialSyncPageSize,
  }),
};
