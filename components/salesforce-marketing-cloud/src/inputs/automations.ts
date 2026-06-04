import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";
import { connection, fetchAll, page, pageSize } from "./common";





const automationId = input({
  label: "Automation ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the automation in Marketing Cloud.",
  example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  placeholder: "Enter automation ID",
  dataSource: "selectAutomation",
  clean: util.types.toString,
});





export const listAutomationsInputs = {
  connection,
  fetchAll,
  pageSize,
  page,
};

export const getAutomationInputs = {
  connection,
  automationId,
};

export const createAutomationInputs = {
  connection,
  automationName: input({
    label: "Automation Name",
    type: "string",
    required: true,
    comments: "The display name for the automation.",
    example: "Daily Data Sync",
    placeholder: "Enter automation name",
    clean: util.types.toString,
  }),
  automationDescription: input({
    label: "Automation Description",
    type: "string",
    required: false,
    comments: "A description of the automation.",
    example: "Syncs data from external source daily",
    placeholder: "Enter automation description",
    clean: toOptionalString,
  }),
  automationExtraBody: input({
    label: "Extra Body",
    type: "code",
    language: "json",
    required: false,
    comments:
      "Additional properties to include in the automation request body (e.g., steps, schedule).",
    example: JSON.stringify(
      {
        type: "scheduled",
        steps: [],
      },
      null,
      2,
    ),
    clean: util.types.toObject,
  }),
};

export const updateAutomationInputs = {
  connection,
  automationId,
  automationExtraBody: input({
    label: "Extra Body",
    type: "code",
    language: "json",
    required: true,
    comments:
      "A JSON object of properties to update on the automation (e.g., name, description, isActive, steps, schedule).",
    example: JSON.stringify(
      {
        name: "Updated Automation Name",
        description: "Updated description",
      },
      null,
      2,
    ),
    clean: util.types.toObject,
  }),
};

export const executeAutomationActivitiesInputs = {
  connection,
  automationId,
};
