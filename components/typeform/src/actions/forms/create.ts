import { action, structuredObjectInput } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  jsonData,
  themeUrl,
  title,
  type,
  workspaceUrl,
} from "../../inputs";
import { getFormResponse as createFormResponse } from "../../examplePayloads/forms";
import type { Form } from "../../interfaces/forms";
import {
  cuiSettingsInput,
  fieldsInput,
  hiddenInput,
  logicInput,
  settingsInput,
  thankyouScreensInput,
  variableInput,
  welcomeScreensInput,
} from "../../exampleInputs/forms";
import { formatCode, setHrefObject } from "../../util";
const additionalFields = structuredObjectInput({
  label: "Additional Fields",
  required: false,
  comments:
    "Additional optional fields: includes Theme, Workspace URL, CUI Settings, Fields, Hidden, Logic, Settings, Thank You Screens, Variables, and Welcome Screens.",
  inputs: {
    theme: themeUrl,
    workspaceUrl,
    cuiSettings: {
      ...jsonData,
      label: "CUI Settings",
      example: formatCode(cuiSettingsInput),
      comments: "The CUI settings for the form.",
    },
    fields: {
      ...jsonData,
      label: "Fields",
      example: formatCode(fieldsInput),
      comments: "The fields for the form.",
    },
    hidden: {
      ...jsonData,
      label: "Hidden",
      example: formatCode(hiddenInput),
      comments: "The hidden fields for the form.",
    },
    logic: {
      ...jsonData,
      label: "Logic",
      example: formatCode(logicInput),
      comments: "The logic for the form.",
    },
    setting: {
      ...jsonData,
      label: "Settings",
      example: formatCode(settingsInput),
      comments: "The settings for the form.",
    },
    thankyouScreen: {
      ...jsonData,
      label: "Thank You Screens",
      example: formatCode(thankyouScreensInput),
      comments: "The thank you screens for the form.",
    },
    variables: {
      ...jsonData,
      label: "Variables",
      example: formatCode(variableInput),
      comments: "The variables for the form.",
    },
    welcomeScreens: {
      ...jsonData,
      label: "Welcome Screens",
      example: formatCode(welcomeScreensInput),
      comments: "The welcome screens for the form.",
    },
  },
});
export const createForm = action({
  display: {
    label: "Create Form",
    description: "Create a form",
  },
  inputs: {
    title,
    type,
    additionalFields,
    connection,
  },
  perform: async (context, { connection, additionalFields, title, type }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.post<Form>(`/forms`, {
      cui_settings: additionalFields.cuiSettings,
      fields: additionalFields.fields,
      hidden: additionalFields.hidden,
      logic: additionalFields.logic,
      setting: additionalFields.setting,
      thankyou_screens: additionalFields.thankyouScreen,
      theme: setHrefObject(additionalFields.theme),
      title,
      type,
      variables: additionalFields.variables,
      welcome_screens: additionalFields.welcomeScreens,
      workspace: setHrefObject(additionalFields.workspaceUrl),
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createFormResponse,
  },
});
