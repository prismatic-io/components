import { trigger } from "@prismatic-io/spectral";
import { spreadsheetChangeEventsInputs } from "../inputs";
import {
  spreadsheetChangeEventsCreate,
  spreadsheetChangeEventsDelete,
  spreadsheetChangeEventsPerform,
} from "../helpers";
import { spreadsheetChangeEventsPayload } from "../examplePayloads";

export const spreadsheetChangeEvents = trigger({
  display: {
    label: "Spreadsheet Change Events",
    description:
      "Receive change notifications for a Google Spreadsheet. Automatically creates and manages a Google Drive push notification subscription when the instance is deployed, and removes the subscription when the instance is deleted.",
  },
  perform: spreadsheetChangeEventsPerform,
  inputs: spreadsheetChangeEventsInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "valid",
  allowsBranching: true,
  staticBranchNames: ["Push Notifications", "Log Messages"],
  examplePayload: spreadsheetChangeEventsPayload,
  webhookLifecycleHandlers: {
    create: spreadsheetChangeEventsCreate,
    delete: spreadsheetChangeEventsDelete,
  },
});
